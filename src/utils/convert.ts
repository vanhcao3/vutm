import moment from "moment";
import i18n from "@/i18n";

export const convertLongLat = (value: number, longOrLat: string) => {
     const directions = longOrLat === "longitude" ? "EW" : "NS";
     // get absolute value and direction of long lat
     let absoluteValue = value;
     let direction = directions[0];
     if (value < 0) {
          absoluteValue = -value;
          direction = directions[1];
     }
     // get degree
     const degree = parseInt(String(absoluteValue), 10);
     // remainder of degree after comma ','
     let remain = absoluteValue - degree;
     // get minute
     const minute = parseInt(String(remain * 60), 10);
     // remainder of minute after comma ','
     remain = remain * 60 - minute;
     // get second
     const second = Math.round(remain * 60);
     return {
          degree: degree,
          minute: minute,
          second: second,
          direction: direction,
     };
};

/**
 * Add 0 to minute / second if it is < 10
 *
 * @param number: integer value of minute / second
 *
 * @return formatted value
 */
export const formatMinuteAndSec = (number: number) => {
     return (number < 10 ? "0" : "") + number;
};

export const data2hashMap = (payload: Array<any>, keyName: string) => {
     return new Map(
          payload.map((obj) => {
               return [obj[keyName], obj];
          })
     );
};

export const convertTimeToDate = (value: number) => {
     if (value) {
          return moment(value * 1000).format("DD/MM/YYYY HH:mm:ss");
     } else {
          return "";
     }
};

export const convertListCountries = (listCountries: string[], countries: any) => {
     return listCountries
          .map((country: string) => {
               return countries[country];
          })
          .join(", ");
};

export const convertArrayCountries = (listCountries: string[], countries: any) => {
     return listCountries.map((country: string) => countries[country]);
};

export const convertCountry = (country: string, countries: any) => {
     return countries[country];
};

export const formatNumber = (value: number | null | undefined) => {
     if (!value && value !== 0) return "";

     if (value === 0) return value;

     if (typeof value === "string") {
          value = Number.parseFloat(value);
     }
     return value.toFixed(2);
};

/**
 * transform DEG to DDMMSS
 *
 *
 * @returns Number
 * @param value
 */
export const transformDEGtoDDMMSS = (value: number) => {
     if (!value) return "";

     const { dd, mm, ss } = convertDEGToDMS(value);
     return `${dd}°${mm}'${ss}"`;
};

export const radian2Degree = (value: number) => {
     return (value * 180) / Math.PI;
};

export interface DDMMSS {
     dd: string;
     mm: string;
     ss: string;
}

/**
 * Convert long, lat number to degrees, mins, seconds (dd, mm, ss)
 * @param {number} coordinate
 * @return { dd: degrees, mm: minutes, ss: seconds }
 */
export function convertDEGToDMS(coordinate: number): DDMMSS {
     const absolute: number = Math.abs(coordinate);
     let degrees: number = Math.floor(absolute);
     const minutesNotTruncated: number = (absolute - degrees) * 60;
     let minutes: number = Math.floor(minutesNotTruncated);
     let seconds: number = Math.round((minutesNotTruncated - minutes) * 60);
     if (seconds === 60) {
          minutes += 1;
          seconds = 0;
     }
     if (minutes === 60) {
          degrees += 1;
          minutes = 0;
     }
     degrees = coordinate > 0 ? degrees : -degrees;
     return {
          dd: Number.isNaN(degrees) ? "" : degrees.toString(),
          mm: Number.isNaN(minutes) ? "" : minutes.toString(),
          ss: Number.isNaN(seconds) ? "" : seconds.toString(),
     };
}

export const a11yProps = (index: number) => {
     return {
          id: `simple-tab-${index}`,
          "aria-controls": `simple-tabpanel-${index}`,
     };
};

export const objectToArray = (obj: Record<string, unknown>) => {
     return Object.values(obj);
};

export const convertTimeToDate2 = (value: number) => {
     if (value) {
          return moment(value).format("DD/MM/YYYY");
     } else {
          return "";
     }
};

export const convertDateToTime = (value: string) => {
     if (value) {
          return moment(value, "DD/MM/YYYY").toDate().getTime();
     } else return 100000;
};

export const convertArrayToObject = (input: Array<any>, key = "id") => {
     let result: Record<string, any> = {};
     input.forEach((item) => {
          result = { ...result, [item[key]]: item };
     });
     return result;
};

export const convertValidateEnumToString = (status: number) => {
     switch (status) {
          case 0:
               return "Đã tạo";
          case 1:
               return "Đã gửi";
          case 2:
               return "Đã phê duyệt";
          default:
               return "";
     }
};

export const reverseLatLong = (position: Array<number>) => {
     return [position[1], position[0]];
};
