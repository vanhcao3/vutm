import { useState } from "react";
import { Wheel, ShadeSlider, Hue, hsvaToRgbaString, hsvaToHex, hexToHsva, Sketch } from "@uiw/react-color";
import { Popover } from "@mui/material";

interface hsvaType {
    h: number;
    s: number;
    v: number;
    a: number;
}

interface VTColorPickerProps {
    onColorEmit: (dataColor: any) => void,
    value: string,
    type?: 'wheel' | 'bar' | 'sketch'
}

export function VTColorPicker(props: VTColorPickerProps) {
    const { onColorEmit, value, type } = props
    const valueConvert = ['wheel', 'bar'].includes(type) ?
        hexToHsva(value)
        : value
    const [wheelHsva, setWgeelHsva] = useState<hsvaType>(valueConvert as hsvaType)
    const [slideHsva, setSlideHsva] = useState<hsvaType>(valueConvert as hsvaType)
    const [sketchHsva, setSketchHsva] = useState<string>(valueConvert as string)
    const [anchorEl, setAnchorEl] = useState(null)

    const handleOpen = (e) => {
        setAnchorEl(e.target)
    }

    const handleClose = () => {
        setAnchorEl(null)

        if (['wheel', 'bar'].includes(type)) {
            return onColorEmit(hsvaToHex(type === 'wheel' ? wheelHsva : slideHsva))
        }

        return onColorEmit(sketchHsva)
    }

    return (
        <div className='flex items-center'>
            <button
                className='w-[44px] h-[23px] rounded'
                style={{
                    backgroundColor: `${['wheel', 'bar'].includes(type) ?
                        hsvaToRgbaString(type === 'wheel' ? wheelHsva : slideHsva)
                        : sketchHsva}`
                }}
                onClick={(handleOpen)}
            />
            <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <div className='mt-4 ml-4 font-bold'>Select Color:</div>

                {/* Wheel Color */}
                {
                    type === 'wheel' &&
                    <div className='px-4 pb-4 pt-3'>
                        <Wheel
                            color={wheelHsva}
                            onChange={(color) => {
                                setWgeelHsva({ ...wheelHsva, ...color.hsva })
                            }}
                        />
                        <ShadeSlider
                            className='mt-4'
                            hsva={wheelHsva}
                            onChange={(color) => {
                                setWgeelHsva({ ...wheelHsva, v: color.v })
                            }}
                        />
                    </div>
                }

                {/* Bar Color */}
                {
                    type === 'bar' &&
                    <div className='px-4 pb-4 pt-3 w-[250px]'>
                        <Hue
                            hue={slideHsva.h}
                            onChange={(color) => {
                                setSlideHsva({ ...slideHsva, ...color })
                            }}
                        />
                        <ShadeSlider
                            className='mt-3'
                            hsva={slideHsva}
                            onChange={(color) => {
                                setSlideHsva({ ...slideHsva, ...color })
                            }}
                        />
                    </div>
                }

                {/* Default Color */}
                {
                    ['sketch', undefined].includes(type) &&
                    <div className='px-4 pb-4 pt-3 w-[250px]'>
                        <Sketch
                            color={sketchHsva}
                            onChange={(color) => {
                                setSketchHsva(color.hex)
                            }}
                        />
                    </div>
                }
            </Popover>
        </div>
    );
}