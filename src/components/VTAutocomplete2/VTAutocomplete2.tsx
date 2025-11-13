import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Autocomplete, AutocompleteRenderInputParams, Checkbox, CircularProgress, TextField } from "@mui/material";
import { multiply } from "lodash";
import React, { ReactNode, useEffect, useState } from "react";

interface VTAutocomplete2Props {
    /**
     * Options select
     */
    data: any;

    /**
     * Tên select
     */
    label: string;

    /**
     * Placeholder select
     */
    placeholder?: string;

    /**
     * Lựa chọn nhiều option
     */
    multiply?: boolean;

    /**
     * lựa chọn dưới dạng checkbox
     */
    checkbox?: boolean;

    /**
     * @param value các giá trị được chọn
     * @returns giá trị được chọn
     */
    handleSubmit?: (value) => void;

    /**
     * @param value Giá trị đang nhập ở ô Input
     * @returns giá trị ô input
     */
    handleInputValue?: (value) => void;
}

export function VTAutocomplete2(props: VTAutocomplete2Props) {
    const { data, label, placeholder, multiply = false, checkbox = false, handleSubmit, handleInputValue } = props;
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const icon = <CheckBoxOutlineBlank fontSize="small" />;
    const checkedIcon = <CheckBox fontSize="small" />

    useEffect(() => {
        handleInputValue(inputValue);
    }, [inputValue]);

    useEffect(() => {
        handleSubmit(selectedOptions);
    }, [selectedOptions])

    return (
        <div>
            <Autocomplete
                multiple={multiply}
                value={selectedOptions}
                onChange={(event, value) => setSelectedOptions(value)}
                inputValue={inputValue}
                onInputChange={(event, value) => setInputValue(value)}
                options={data}
                disableCloseOnSelect={checkbox}
                renderOption={(props, option, { selected }) => {
                    if (checkbox) {
                        return (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    checked={selected}
                                />
                                {option.label}
                            </li>
                        )
                    }
                    return (
                        <li {...props}>
                            {option.label}
                        </li>
                    )
                }}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            label={label}
                            placeholder={placeholder ?? label}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {data.length ? null : <CircularProgress color="inherit" size={20} />}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                )
                            }}
                        />
                    )
                }}
            />
        </div>
    )
}