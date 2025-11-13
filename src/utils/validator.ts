import { isArray, isEmpty, includes, capitalize } from 'lodash';
import moment from 'moment';

import {
  VALIDATE_NUMBER,
  VALIDATE_REQUIRED,
  VALIDATE_BETWEEN,
  VALIDATE_MAX,
  VALIDATE_MIN,
  VALIDATE_DECIMAL,
  VALIDATE_IN,
  VALIDATE_COORDINATE,
  VALIDATE_LESS,
  VALIDATE_GREATER,
  VALIDATE_BETWEEN_NUMBER,
  VALIDATE_CHECK_HOUR,
  VALIDATE_IP,
} from '@/config/constantValidateConfig';
import i18n from '@/i18n';

export const isValidMinLength = (value: any, minLength: number) => value.length > minLength;

export const isValidMaxLength = (value: any, maxLength: number) => value.length < maxLength;

export const isValidMinAndMaxLength = (value: any, minLength: number, maxLength: number) =>
  value.length <= maxLength && value.length >= minLength;

export const isPasswordValid = (value: string) =>
  value.match('^[a-zA-Z0-9!@#\\$%\\^\\&*\\)\\(+=._-]+$');

export const isUsernameValid = (value: string) => value.match('^[\\d\\w]+$');

let arrKeys: Array<any> = []; // EX: obj = { key1: { key2: value2 } } => arrKeys = [key1, key2]
let errors: any = {};
/**
 * Validate object data with object validate
 * Example rules:
 * - Check number: number
 * - Check ip: ip
 * - Check max: max:20
 * - Check min: min:5
 * - Check decimal: decimal
 * - Check between: between:5,20
 * - Check required: required
 * - Check in: in:1,3,5,7
 * - Check coordinate: coordinate:5 => special rule: keyObject add surfix 'Coordinate'
 * - Check mixed: required|number|in:1,3,5,7
 *
 * @param {Object} data Data wanna check
 * @param {Object} rules Rules wanna check validate
 * @param {Object} options Options for check validate
 * @param {Boolean} isResetChecking Flag for reset checking, if loop children => do not reset
 *
 * @return Array
 */
export const fncValidate = (
  data = {},
  rules: { [key: string]: any } = {},
  options: { [key: string]: any } = {}
) => {
  const { isResetChecking = true, modelName = '' } = options;
  // reset variables use for checking
  if (isResetChecking) {
    arrKeys = [];
    errors = {};
  }

  // loop rules data
  Object.keys(rules).forEach((ruleItemKey) => {
    const ruleItemInfo = rules[ruleItemKey];
    const isRuleCoordinate = includes(ruleItemInfo, VALIDATE_COORDINATE);
    ruleItemKey = isRuleCoordinate
      ? ruleItemKey.replace(capitalize(VALIDATE_COORDINATE), '')
      : ruleItemKey;
    arrKeys.push(ruleItemKey);
    // if rule item has children rules => recursive
    if (typeof ruleItemInfo === 'object') {
      fncValidate(data, ruleItemInfo, { ...options, isResetChecking: false });
    }

    // if rule item is string rules wanna check => split rule string => rule array
    // multiple rules separate each other by '|'
    let arrRulesDetail: Array<any> = [];
    if (typeof ruleItemInfo === 'string') {
      arrRulesDetail = ruleItemInfo.split('|');
    }
    arrRulesDetail = sortRulesWithPriority(arrRulesDetail);

    const keyError = arrKeys.join('.');
    // get value wanna check from source data
    let valueCheck: any = data;
    arrKeys.forEach((dataKey) => {
      valueCheck = valueCheck[dataKey];
    });

    // loop rules detail => check each rule detail item
    const isCheckNum = isMatchTwoArray(arrRulesDetail, [VALIDATE_NUMBER, VALIDATE_DECIMAL]);
    arrRulesDetail.some((ruleDetailItem) => {
      // check source data with each rule detail item
      const isValid = fncValidateByRule(ruleDetailItem, valueCheck, { isCheckNum });
      // if data is invalid => push data to object errors
      if (!isValid) {
        errors[`${keyError}`] = fncValidateMsgError(ruleDetailItem, keyError, {
          ...options,
          isCheckNum,
          modelName,
        });
        return true;
      }
      return false;
    });

    arrKeys.pop();
  });

  return errors;
};

/**
 * Check valid data by rule item
 *
 * @param {String} rule Rule name
 * @param {Mixed} valueCheck Data wanna check
 * @param {Object} options Options for more check
 *
 * @return Boolean
 */
export const fncValidateByRule = (rule = '', valueCheck: any, options: any = {}) => {
  const { isCheckNum } = options;
  const arrRules = rule.split(':');
  const [ruleName, ruleValue] = arrRules;
  valueCheck = valueCheck === null || valueCheck === undefined ? '' : valueCheck;

  switch (ruleName) {
    case VALIDATE_MAX:
      if (isEmptyValue(valueCheck)) return true;

      return isCheckNum
        ? parseFloat(valueCheck) <= parseFloat(ruleValue)
        : valueCheck.length <= ruleValue;
    case VALIDATE_MIN:
      if (isEmptyValue(valueCheck)) return true;

      return isCheckNum
        ? parseFloat(valueCheck) >= parseFloat(ruleValue)
        : valueCheck.length >= ruleValue;
    case VALIDATE_BETWEEN: {
      if (isEmptyValue(valueCheck)) return true;

      const arrBetween = ruleValue.split(',');
      valueCheck = isCheckNum ? valueCheck : valueCheck.length;

      return valueCheck >= parseFloat(arrBetween[0]) && valueCheck <= parseFloat(arrBetween[1]);
    }
    case VALIDATE_BETWEEN_NUMBER: {
      if (isEmptyValue(valueCheck)) return true;

      const arrBetween = ruleValue.split(',');
      valueCheck = isCheckNum ? valueCheck : valueCheck.length;

      return valueCheck >= parseFloat(arrBetween[0]) && valueCheck <= parseFloat(arrBetween[1]);
    }
    case VALIDATE_CHECK_HOUR: {
      const hoursNow = moment(Date.now()).hour();
      const minutesNow = moment(Date.now()).minute();
      const secondsCurrent = hoursNow * 3600 + minutesNow * 60;
      if (isEmptyValue(valueCheck)) return true;
      if (secondsCurrent - valueCheck >= 14400) {
        return true;
      }
      return false;
    }
    case VALIDATE_LESS: {
      if (isEmptyValue(valueCheck)) return true;

      return isCheckNum
        ? parseFloat(valueCheck) < parseFloat(ruleValue)
        : valueCheck.length < ruleValue;
    }
    case VALIDATE_GREATER:
      if (isEmptyValue(valueCheck)) return true;

      return isCheckNum
        ? parseFloat(valueCheck) > parseFloat(ruleValue)
        : valueCheck.length > ruleValue;
    case VALIDATE_NUMBER:
      if (isEmptyValue(valueCheck)) return true;

      return Number.isInteger(parseFloat(valueCheck));
    case VALIDATE_DECIMAL:
      if (isEmptyValue(valueCheck)) return true;

      return isNumeric(valueCheck);
    case VALIDATE_IN: {
      if (isEmptyValue(valueCheck)) return true;

      valueCheck = typeof valueCheck === 'string' ? valueCheck : valueCheck.toString();
      const arrValue = ruleValue.split(',');
      return includes(arrValue, valueCheck);
    }
    case VALIDATE_IP: {
      if (valueCheck.split('.').length === 4) {
        const IPList = valueCheck.split('.');
        for (let i = 0; i < IPList.length; i += 1) {
          if (
            Number(IPList[i]) >= 256 ||
            Number(IPList[i]) < 0 ||
            Number(IPList[i]).toString() !== IPList[i]
          ) {
            return false;
          }
        }
        return true;
      }
      return false;
    }
    case VALIDATE_COORDINATE: {
      if (isEmpty(valueCheck)) return true;

      const { degree, min, sec } = valueCheck;
      const arrBetween = ruleValue.split(',');
      if (
        parseFloat(degree) > parseFloat(arrBetween[1]) ||
        (parseFloat(degree) === parseFloat(arrBetween[1]) && (min > 0 || sec > 0))
      )
        return false;
      return true;
    }
    case VALIDATE_REQUIRED:
    default:
      valueCheck = typeof valueCheck === 'string' ? valueCheck : valueCheck.toString();
      return !!valueCheck.trim().length;
  }
};

/**
 * Get msg error when validate
 *
 * @param {String} rule Rule name
 * @param {String} keyError Key name
 * @param {Object} options Options wanna more process
 *
 * @return String
 */
export const fncValidateMsgError = (rule = '', keyError = '', options: any = {}) => {
  const { messages = {}, labels = {}, isCheckNum, modelName = '' } = options;
  const arrRules = rule.split(':');
  const [ruleName, ruleValue] = arrRules;
  let min = ruleValue;
  let max = ruleValue;

  const msgDefault = i18n.t(messages[`${keyError}.${ruleName}`]);
  const label = labels[keyError] || keyError;

  let msg = '';
  switch (ruleName) {
    case VALIDATE_MAX:
      msg = isCheckNum ? 'validate.max_number' : 'validate.max';
      break;
    case VALIDATE_MIN:
      msg = isCheckNum ? 'validate.min_number' : 'validate.min';
      break;
    case VALIDATE_BETWEEN: {
      const arrBetween = ruleValue.split(',');
      min = arrBetween[0];
      max = arrBetween[1];
      msg = isCheckNum ? 'validate.between_number' : 'validate.between';
      break;
    }
    case VALIDATE_BETWEEN_NUMBER: {
      const arrBetween = ruleValue.split(',');
      min = arrBetween[0];
      max = arrBetween[1];
      msg = isCheckNum ? 'validate.between_number' : 'validate.between';
      break;
    }
    case VALIDATE_LESS:
      msg = isCheckNum ? 'validate.less_number' : 'validate.less';
      break;
    case VALIDATE_GREATER:
      msg = isCheckNum ? 'validate.greater_number' : 'validate.greater';
      break;
    case VALIDATE_NUMBER:
      msg = 'validate.number';
      break;
    case VALIDATE_DECIMAL:
      msg = 'validate.decimal';
      break;
    case VALIDATE_IN:
      msg = 'validate.in';
      break;
    case VALIDATE_IP:
      msg = 'validate.ip';
      break;
    case VALIDATE_COORDINATE: {
      const arrBetween = ruleValue.split(',');
      min = arrBetween[0];
      max = arrBetween[1];
      msg = 'validate.coordinate';
      break;
    }
    case VALIDATE_REQUIRED:
    default:
      msg = 'validate.required';
      break;
  }

  let key = modelName ? i18n.t(`${modelName}.${label}`) : i18n.t(label);
  key = key.toLowerCase();
  return msgDefault || i18n.t(msg, { key: key, min, max });
};

/**
 * Check value is numeric or not
 *
 * @param {*} value Value wanna check numeric
 *
 * @return Boolean
 */
export const isNumeric = (value: any) => {
  // parseFloat NaNs numeric-cast false positives (null|true|false|"")
  // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
  // subtraction forces infinities to NaN
  // adding 1 corrects loss of precision from parseFloat (#15100)
  const realStringObj = value && value.toString();
  return !isArray(value) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
};

/**
 * Check value of array is exist in another array
 *
 * @param {Array} arr1 Array 1
 * @param {Array} arr2 Array 2
 *
 * @return Boolean
 */
export const isMatchTwoArray = (arr1: Array<any> = [], arr2: Array<any> = []) => {
  const commonArr = arr1.filter(function (val1) {
    return arr2.some(function (val2) {
      return val1 === val2; // return the ones with equal id
    });
  });

  return commonArr.length;
};

/**
 * Sort rules with priority rule
 *
 * @param {Array} rules List of rules
 *
 * @return Array
 */
export const sortRulesWithPriority = (rules: Array<any> = []): Array<any> => {
  const priorities: any = {
    [VALIDATE_REQUIRED]: 1,
    [VALIDATE_NUMBER]: 2,
    [VALIDATE_DECIMAL]: 2,
  };

  rules.sort((rule1, rule2) => {
    const rule1Priority = priorities[rule1] || 99;
    const rule2Priority = priorities[rule2] || 99;

    return rule1Priority - rule2Priority;
  });

  return rules;
};

/**
 * Check value is empty
 *
 * @param {*} value Data
 *
 * @return Boolean
 */
export const isEmptyValue = (value: any) => {
  if (typeof value === 'number') {
    return !value.toString().length;
  }

  return !value.length;
};

/**
 * Check array and return empty array if not array
 * @param {*} data
 * @return [] if is not array
 */
export const checkArray = (data: any) => {
  return Array.isArray(data) ? data : [];
};

export default fncValidate;
