import { useState } from "react"
import './index.scss'
import MovableItemDnd from "@/components/VTDragDrop/component/MovableItemDnd"
import ColumnDnd from "@/components/VTDragDrop/component/ColumnDnd"
import ItemDragAround from "@/components/VTDragAround/ItemDragAround"
import VTDragAroundContainer from "@/components/VTDragAround"

export function DemoDnd() {
    const [dataPosition, setDataPosition] = useState({ top: 0, left: 0 })
    const [dataMove, setDataMove] = useState([
        {
            name: 'Column 1',
            type: 'MOVE',
            metaData: [
                { id: 1, name: '1' },
                { id: 2, name: '2' },
                { id: 3, name: '3' },
                { id: 4, name: '4' },
                { id: 5, name: '5' },
                { id: 7, name: '7' },
            ]
        },
        {
            name: 'Column 2',
            type: 'MOVE',
            metaData: [
                { id: 6, name: '6' },
                { id: 8, name: '8' },
                { id: 9, name: '9' },
                { id: 10, name: '10' },
            ]
        }
    ])

    const [dataSwap, setDataSwap] = useState([
        {
            name: 'Column 1',
            type: 'SWAP',
            metaData: [
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' },
                { id: 3, name: 'Item 3' },
                { id: 4, name: 'Item 4' },
                { id: 5, name: 'Item 5' },
                { id: 6, name: 'Item 6' },
            ]
        },
    ])

    const handleDrop = (dataPositon) => {
        setDataPosition(dataPositon)
    }

    return (
        <div className='demo-dnd'>
            <VTDragAroundContainer>
                <div>
                    {/* Drag Drop Move */}
                    <div className='flex flex-col'>
                        <div className='font-bold mb-3'>Drag Drop Move</div >
                        {
                            dataMove.map((column) => (
                                <ColumnDnd
                                    key={column.name}
                                    className='column'
                                    title={column.name}
                                    type={column.type}
                                >
                                    {
                                        column.metaData.map((item, index) => {
                                            return (
                                                <MovableItemDnd
                                                    className='movable-item'
                                                    key={item.id}
                                                    index={index}
                                                    name={item.name}
                                                    dataSource={dataMove}
                                                    setDataSource={setDataMove}
                                                    type={column.type}
                                                    currentColumnName={column.name}
                                                />
                                            )
                                        })
                                    }
                                </ColumnDnd>
                            ))
                        }
                    </div>

                    {/* Drag Drop Swap */}
                    <div className='drag-drop-swap'>
                        <div className='font-bold mb-3'>Drag Drop Swap</div >
                        {
                            dataSwap.map((column) => (
                                <ColumnDnd
                                    className='column-swap'
                                    key={column.name}
                                    title={column.name}
                                    type={column.type}
                                >
                                    {
                                        column.metaData.map((item, index) => {
                                            return (
                                                <MovableItemDnd
                                                    className='items-swap'
                                                    key={item.id}
                                                    index={index}
                                                    name={item.name}
                                                    dataSource={dataSwap}
                                                    setDataSource={setDataSwap}
                                                    typeHandle='swap'
                                                    type={column.type}
                                                    currentColumnName={column.name}
                                                />
                                            )
                                        })
                                    }
                                </ColumnDnd>
                            ))
                        }
                    </div>
                </div>

                {/* Drag Around */}
                <ItemDragAround initTop={20} initLeft={600} onDrop={handleDrop}>
                    <div className='item-drag-around'>
                        <div>Top: {dataPosition.top}</div>
                        <div>Left: {dataPosition.left}</div>
                    </div>
                </ItemDragAround>
                <ItemDragAround>
                    <div className='item-drag-around'>
                        <div>span 3</div>
                        <div>span 4</div>
                    </div>
                </ItemDragAround>
            </VTDragAroundContainer>
        </div >
    )
}