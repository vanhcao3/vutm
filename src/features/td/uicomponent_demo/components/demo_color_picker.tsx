import VTColorPicker from "@/components/VTColorPicker";
import { useState } from "react";

export function DemoColorPicker() {
    const [valueColor, setValueColor] = useState('#2cc944')

    const handleChange = (dataColor) => {
        setValueColor(dataColor)
    }

    return (
        <>
            <div className='font-bold' style={{ 'color': `${valueColor}` }}>Test Color: {valueColor}</div>
            <div className='mt-3 flex items-center'>
                <span className='mr-3'>Set Color: </span>
                <VTColorPicker
                    onColorEmit={handleChange}
                    value={valueColor}
                // type='wheel'
                />
            </div>
        </>
    );
}