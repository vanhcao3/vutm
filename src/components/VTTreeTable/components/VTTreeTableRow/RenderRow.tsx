import { useEffect, useState } from "react";
import './index.scss'
import { columnsType } from "../VTTreeTable";
import { useSelector } from "react-redux";
import { RootState } from "@/slices";
import { Checkbox } from "@mui/material";

export interface RenderRowProps {
    personData: any

    // Vị trí child thứ bao nhiêu
    indexChild?: number

    // Loại đường kẻ nối giữa các node cha và con
    type?: 'lineSolid' | 'lineDashed' | 'unLine',

    columns: columnsType[]

    // Collapse All | Expand All
    isToggleAll?: boolean

    // Loại checkBox: 'single' : checkbox từng node riêng biệt | 'dependent': checkbox phụ thuộc cha/con
    typeCheckBoxNode?: 'single' | 'dependent'

    dataCheckBox?: any

    // Xử lý sự kiện change checkBox
    onChangeCheckBox?: (event: any) => void
}

export const RenderRow = (props: RenderRowProps) => {
    const { personData, indexChild, type, columns, isToggleAll, typeCheckBoxNode, dataCheckBox, onChangeCheckBox } = props
    const themeType = useSelector((state: RootState) => state.theme.type);
    const [isToggle, setIsToggle] = useState(false)
    const nextIndexChild = (indexChild || 1) + 1

    useEffect(() => {
        setIsToggle(isToggleAll)
    }, [isToggleAll])

    const handleToggle = () => {
        setIsToggle((prev) => !prev)
    }

    return (
        <>
            <tr className='customRenderRow'>
                {
                    columns.map((col, index) => {
                        if (!col.root) return <td key={col.key} className='border p-2 text-center'>
                            {col.render ? col.render(personData) : personData[col.key]}
                        </td>
                        else return (
                            <td key='root' className='border p-2 flex items-center min-h-[60px]'>
                                {
                                    typeCheckBoxNode &&
                                    <Checkbox
                                        className='mr-3 cursor-pointer'
                                        name={`${personData.id}`}
                                        checked={dataCheckBox?.[`${personData.id}`] ?? false}
                                        id={personData.id}
                                        onChange={onChangeCheckBox}
                                    />
                                }
                                <div style={{ 'paddingLeft': `${type === 'unLine' ? `${20 * indexChild}px` : ''}` }}>
                                    {
                                        type === 'unLine' && (
                                            personData.children ?
                                                (
                                                    <button className='flex' onClick={handleToggle}>
                                                        <p className={`${isToggle ? 'rotate-90' : ''} mr-1`}>&#8250;</p>
                                                        {personData[col.key]}
                                                    </button>
                                                ) :
                                                (
                                                    <span>&#8226; {' '} {personData[col.key]}</span>
                                                )
                                        )
                                    }

                                    {
                                        type !== 'unLine' && (
                                            <>
                                                {/* TH item đầu tiên và có children */}
                                                {
                                                    !indexChild && personData.children && <button onClick={handleToggle} className={`${themeType === 'dark' && 'text-black'} iconBox mr-1`}>
                                                        {isToggle ? '-' : '+'}
                                                    </button>
                                                }
                                                {/* Các TH khác */}
                                                {
                                                    indexChild && Array(indexChild).fill(0).map((_, index) => {
                                                        const currentIndex = index + 1

                                                        const handleRenderStyleCollapse = () => {
                                                            {/* TH box cuối cùng và có children */ }
                                                            if (currentIndex === indexChild && personData.children) {
                                                                {/* TH chỉ có 1 box */ }
                                                                if (indexChild === 1) {
                                                                    return (
                                                                        <button
                                                                            key={index}
                                                                            onClick={handleToggle}
                                                                            style={{}}
                                                                            className={`mr-1 ${type === 'lineDashed' ? 'iconBox' : 'iconBoxChild'} ${themeType === 'dark' && 'after:!border-b-white'}`}
                                                                        >
                                                                            <span className={`${themeType === 'dark' && 'text-black'}`}>{isToggle ? '-' : '+2'}</span>
                                                                        </button>
                                                                    )
                                                                }
                                                                return (
                                                                    <button
                                                                        key={index}
                                                                        onClick={handleToggle}
                                                                        className={`mr-1 ${type === 'lineDashed' ? 'iconBox' : 'iconBoxChild'} ${themeType === 'dark' && 'after:!border-b-white'}`}
                                                                    >
                                                                        <span className={`${themeType === 'dark' && 'text-black'}`}>{isToggle ? '-' : '+'}</span>
                                                                    </button>
                                                                )
                                                            }

                                                            {/* TH box cuối cùng và không có children*/ }
                                                            if (currentIndex === indexChild && !personData.children) {
                                                                {/* TH chỉ có 1 box */ }
                                                                if (indexChild === 1) {
                                                                    return <span key={index} className={`horizontal-${type} mr-1 ${themeType === 'dark' && 'after:!border-b-white before:!bg-white'}`} />
                                                                }
                                                                return <span key={index} className={`horizontal-${type} mr-1 ${themeType === 'dark' && 'after:!border-b-white before:!bg-white'}`} />
                                                            }

                                                            {/* Các TH khác */ }
                                                            return <span key={index} className={`vartical-${type} mr-1 ${themeType === 'dark' && 'before:!border-l-white'}`} />

                                                        }
                                                        return (
                                                            handleRenderStyleCollapse()
                                                        )
                                                    })
                                                }
                                                {type === 'lineDashed' && personData[col.key]}
                                            </>
                                        )
                                    }
                                </div>
                            </td>
                        )
                    })
                }
            </tr >
            {
                isToggle &&
                (personData.children && personData.children.map((person, index) => {
                    return (
                        <RenderRow
                            key={`${indexChild}${index}`}
                            personData={person}
                            indexChild={nextIndexChild}
                            type={type}
                            columns={columns}
                            isToggleAll={isToggleAll}
                            typeCheckBoxNode={typeCheckBoxNode}
                            dataCheckBox={dataCheckBox}
                            onChangeCheckBox={onChangeCheckBox}
                        />
                    )
                }))
            }
        </>
    );
}