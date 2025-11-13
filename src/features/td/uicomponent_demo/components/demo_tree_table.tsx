import VTTreeTable from "@/components/VTTreeTable/components";
import { Checkbox, Input, Radio, Button } from "@mui/material";
import { useState } from "react";

export function DemoTreeTable() {
    const data = [
        {
            name: 'qc',
            sscd: 'TB',
            ccd: 'C1',
            text: '123',
            id: '1',
            children: [
                {
                    name: 'f362',
                    sscd: 'TB',
                    ccd: 'C2',
                    id: '2',
                    children: [
                        {
                            id: '3',
                            name: '3236',
                            sscd: 'TB',
                            ccd: 'C3',
                            checked: true
                        },
                        {
                            id: '4',
                            name: 'e250',
                            sscd: 'TB',
                            ccd: 'C4',
                            children: [
                                {
                                    id: '5',
                                    name: 'd61',
                                    sscd: 'TB',
                                    ccd: 'C5',
                                },
                            ]
                        },
                        {
                            id: '6',
                            name: 'e228',
                            sscd: 'TB',
                            ccd: 'C6',
                            checked: true
                        },
                    ]
                },
                {
                    id: '11',
                    name: 'lu9ss18',
                    sscd: 'TB',
                    ccd: 'C8',
                    checked: true,
                    children: [
                        {
                            id: '12',
                            name: 'd6wddw1',
                            sscd: 'TB',
                            ccd: 'C9',
                        },
                    ]
                },
                {
                    id: '7',
                    name: 'f371',
                    sscd: 'TB',
                    ccd: 'C7',
                    checked: true
                },
                {
                    id: '8',
                    name: 'lu918',
                    sscd: 'TB',
                    ccd: 'C8',
                    checked: true,
                    children: [
                        {
                            id: '9',
                            name: 'd6ww1',
                            sscd: 'TB',
                            ccd: 'C9',
                        },
                    ]
                },
            ]
        },
        {
            id: '15',
            name: 'lu9ff18',
            sscd: 'TB',
            ccd: 'C8',
            checked: true,
            children: [
                {
                    id: '55',
                    name: 'd6ffww1',
                    sscd: 'TB',
                    ccd: 'C9',
                },
            ]
        },
    ]

    const columns = [
        {
            title: 'Đơn vị',
            key: 'name',
            root: true
        },
        {
            title: 'SSCĐ',
            key: 'sscd'
        },
        {
            title: 'CCĐ',
            key: 'ccd',
        },
        {
            title: 'Action CheckBox',
            key: 'checkbox',
            width: '100px',
            render: (data) => {
                return (
                    <Checkbox defaultChecked={data.checked} />
                )
            }
        },
        {
            title: 'Radio',
            key: 'radio',
            width: '100px',
            render: () => {
                return (
                    <Radio defaultChecked={false} />
                )
            }
        },
        {
            title: 'Action Input',
            key: 'input',
            render: (data) => {
                return (
                    <Input name={`text-${data.id}`} onChange={handleChangeInput} defaultValue={data.text} />
                )
            }
        },
    ]

    const [isToggle, setIsToggle] = useState(false)
    const [dataSearch, setDataSearch] = useState('')

    const handleChangeInput = (e) => {
    }

    const handleToggle = () => {
        setIsToggle(!isToggle)
    }

    const handleSearch = (e) => {
        setDataSearch(e.target.value)
    }

    const emitDataCheckBox = (dataCheckBox) => {
        console.log('dataEmitCheckBox', dataCheckBox);
    }

    return (
        <>
            <div className='flex'>
                <Button className='mr-5' onClick={handleToggle}>{isToggle ? 'Collapse All' : 'Expand All'}</Button>
                <Input className='border' type='text' onChange={handleSearch} placeholder={'Search'} />
            </div>
            <VTTreeTable
                className='mt-5'
                dataTree={data}
                columns={columns}
                type='lineDashed'
                isToggleAll={isToggle}
                dataSearch={dataSearch}
                typeCheckBoxNode={'dependent'}
                checkBoxEmit={emitDataCheckBox}
                isCheckBoxNodeAll={true}
            />
        </>
    );
}