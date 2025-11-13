import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { RenderRow } from './VTTreeTableRow'
import { Checkbox } from '@mui/material'

export interface columnsType {
    title: string | JSX.Element,
    key: string,
    render?: (any) => JSX.Element
    root?: boolean,
    width?: string
}

export interface VTTreeTableProps {
    dataTree: any

    // Loại đường kẻ nối giữa các node cha và con
    type?: 'lineSolid' | 'lineDashed' | 'unLine',

    columns: columnsType[]

    className?: string

    // Collapse All | Expand All
    isToggleAll?: boolean

    dataSearch?: string

    // Loại checkBox: 'single' : checkbox từng node riêng biệt | 'dependent': checkbox phụ thuộc cha/con
    typeCheckBoxNode?: 'single' | 'dependent'

    // Bắt sự kiện checkBox trả về  Obj dataCheckBox: {idNode: boolean}
    checkBoxEmit?: (dataCheckBox: any) => void

    isCheckBoxNodeAll?: boolean
}

export const VTTreeTable = (props: VTTreeTableProps) => {
    const { className, dataTree, columns, type, isToggleAll, dataSearch, typeCheckBoxNode, checkBoxEmit, isCheckBoxNodeAll } = props
    const [dataListNode, setDataListNode] = useState([])
    const [dataCheckBox, setDataCheckBox] = useState({})
    const rawDataListNode = []
    const isSetInitDataCheckBox = useRef(false)

    useEffect(() => {
        if (dataTree) {
            dataUpdate(dataTree, null)
            setDataListNode(rawDataListNode);
        }
    }, [dataTree])

    useEffect(() => {
        if (!isSetInitDataCheckBox.current && dataListNode.length) {
            setDataCheckBox(defaultDataCheckBox());
            isSetInitDataCheckBox.current = true
        }
    }, [dataListNode])

    useEffect(() => {
        if (typeCheckBoxNode) {
            const rawDataCheckBoxEmit = {
                idChecked: [],
                idUnchecked: []
            }
            const objArray = Object.entries(dataCheckBox)

            rawDataCheckBoxEmit.idChecked = objArray.filter(([key, value]) => {
                return value === true
            }).map(([key, value]) => key)

            rawDataCheckBoxEmit.idUnchecked = objArray.filter(([key, value]) => {
                return value === false
            }).map(([key, value]) => key)

            checkBoxEmit(rawDataCheckBoxEmit)
        }
    }, [dataCheckBox])

    const defaultDataCheckBox = () => {
        const rawDefaultDataCheckBox = {}
        dataListNode.forEach((item) => {
            return rawDefaultDataCheckBox[item.id] = isCheckBoxNodeAll || false
        })
        return rawDefaultDataCheckBox
    }

    // Làm phẳng mảng dataTree
    const dataUpdate = (data, id_Parent) => {
        data?.map((item) => {
            const rawItem = item
            rawItem.idParent = id_Parent

            // Nếu có children thì tiếp tục đi sâu vào để lấy đủ tất cả data tree
            if (item.children) {
                dataUpdate(item.children, item.id)
            }
            return rawDataListNode.push(rawItem)
        })
    }

    const handleChangeCheckBoxNode = (e: ChangeEvent<HTMLInputElement>) => {
        // Tìm node vừa được change
        const nodeCheck = dataListNode.find((item) => (item.id === e.target.id))

        // Nếu node đó là node cha thì check all node child (type: dependent)
        if (nodeCheck.children && typeCheckBoxNode === 'dependent') {
            const rawDataCheckBox = dataCheckBox
            handleCheckChildren(nodeCheck.children, rawDataCheckBox, e)
            setDataCheckBox((prev) => ({ ...prev, ...rawDataCheckBox }))
        } else {
            setDataCheckBox((prev) => ({ ...prev, [e.target.name]: e.target.checked }))
        }

        // Nếu node đó là con của 1 node, kiểm tra tất cả các node con cùng cấp checked hết chưa (type: dependent)
        if (nodeCheck.idParent && typeCheckBoxNode === 'dependent') {
            checkAllChild(nodeCheck.idParent, e.target.id, e.target.checked)
        }
    }

    // Xử lý check/uncheck tất cả các node child khi check/uncheck node parent
    const handleCheckChildren = (dataChild, rawDataCheckBox, e) => {
        dataChild.forEach((item) => {
            if (item.children) {
                handleCheckChildren(item.children, rawDataCheckBox, e)
            }
            return rawDataCheckBox[`${item.id}`] = e.target.checked
        })
        rawDataCheckBox[e.target.name] = e.target.checked
    }

    // Xử lý khi đã check đủ các node child hay chưa đề check/uncheck node parent
    const checkAllChild = (id_Parent, id_Child, value) => {
        const rawDataCheckBox = dataCheckBox
        rawDataCheckBox[`${id_Child}`] = value
        const dataParent = dataListNode.find((item) => (item.id === id_Parent))

        const lengthChild = dataParent.children.length
        let totalChecked = 0;
        let totalUnChecked = 0;

        dataParent.children.map((item) => {
            if (rawDataCheckBox[`${item.id}`]) {
                totalChecked = totalChecked + 1
            } else {
                totalUnChecked = totalUnChecked + 1
            }
        })

        if (totalChecked === lengthChild) {
            setDataCheckBox((prev) => ({ ...prev, [`${id_Parent}`]: true }))

            // Nếu parent vẫn có parent hơn cấp thì tiếp tục check
            if (dataParent.idParent) {
                checkAllChild(dataParent.idParent, id_Parent, true)
            }
        } else {
            setDataCheckBox((prev) => ({ ...prev, [`${id_Parent}`]: false }))

            // Nếu parent vẫn có parent hơn cấp thì tiếp tục check
            if (dataParent.idParent) {
                checkAllChild(dataParent.idParent, id_Parent, false)
            }
        }
    }

    return (
        <table className={`${className}`}>
            <thead>
                <tr>
                    {columns.map((col) => {
                        return (
                            <th key={col.key} className={`border p-2 ${col.width ? `min-w-[${col.width}]` : 'min-w-[150px]'}`}>{col.title}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {
                    dataSearch && dataListNode.map((item, index) => {
                        if ((item.name.toLowerCase()).includes(dataSearch.toLowerCase())) {
                            return (
                                <tr key={index}>
                                    {
                                        columns.map((col) => {
                                            return <td key={col.key} className={`border p-2 ${col.root ? '' : 'text-center'} `}>
                                                {
                                                    col.root && typeCheckBoxNode &&
                                                    <Checkbox
                                                        className='mr-3 cursor-pointer'
                                                        name={`${item.id}`}
                                                        id={item.id}
                                                        checked={dataCheckBox?.[`${item.id}`] ?? false}
                                                        onChange={handleChangeCheckBoxNode}
                                                    />
                                                }
                                                {col.render ? col.render(item) : item[col.key]}
                                            </td>
                                        })
                                    }
                                </tr >
                            )
                        }
                    })
                }


                {
                    !dataSearch && dataTree.map((personData) => {
                        return <RenderRow
                            key={personData.id}
                            type={type || 'unLine'}
                            personData={personData}
                            columns={columns}
                            isToggleAll={isToggleAll}
                            typeCheckBoxNode={typeCheckBoxNode}
                            dataCheckBox={dataCheckBox}
                            onChangeCheckBox={handleChangeCheckBoxNode}
                        />
                    })
                }
            </tbody>
        </table>
    )
}