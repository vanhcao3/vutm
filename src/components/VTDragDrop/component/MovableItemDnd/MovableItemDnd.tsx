import { DragSourceMonitor, useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';

interface MovableItemDndProps {
    name: string;
    currentColumnName: string;
    className?: string;
    typeHandle?: 'swap' | 'move';
    type: string;
    setDataSource: (any) => void;
    index: number;
    dataSource: any;
}

export const MovableItemDnd = (
    {
        name,
        currentColumnName,
        className,
        typeHandle = 'move',
        type,
        setDataSource,
        index,
        dataSource
    }
        : MovableItemDndProps) => {

    const ref = useRef(null)
    const [, drop] = useDrop({
        accept: type,
        hover(item, monitor) {
            if (currentColumnName !== item['currentColumnName']) return
            if (!ref.current) return

            const dragIndex = item['index']
            const hoverIndex = index

            if (typeHandle !== 'move') {
                item['index'] = hoverIndex
                return
            }

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = clientOffset.x - hoverBoundingRect.left

            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) return
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) return

            // Xử lý Move Item trong cùng 1 Column
            const indexColumnMove = dataSource.findIndex(data => data.name === item['currentColumnName'])
            const dragItem = dataSource[indexColumnMove].metaData[dragIndex];
            if (dragItem) {
                const coppiedItems = [...dataSource];
                const itemDrag = coppiedItems[indexColumnMove].metaData.splice(hoverIndex, 1, dragItem)
                coppiedItems[indexColumnMove].metaData.splice(dragIndex, 1, itemDrag[0])

                setDataSource(coppiedItems)
            }

            item['index'] = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        item: { currentColumnName, index },
        type: type,
        end: (item, monitor) => {
            // Xử lý Swap Item trong cùng 1 Column
            if (typeHandle === 'swap') {
                const indexColumnSwap = dataSource.findIndex(data => data.name === item['currentColumnName'])
                const dragIndex = item['index']
                const hoverIndex = index
                const dragItem = dataSource[indexColumnSwap].metaData[dragIndex];

                if (dragItem) {
                    setDataSource((prev => {
                        const coppiedStateArray = [...prev];
                        [coppiedStateArray[indexColumnSwap].metaData[dragIndex], coppiedStateArray[indexColumnSwap].metaData[hoverIndex]] = [coppiedStateArray[indexColumnSwap].metaData[hoverIndex], coppiedStateArray[indexColumnSwap].metaData[dragIndex]]

                        return coppiedStateArray
                    }))
                }
            }

            // Change Item giữa các Column
            const dropResult = monitor.getDropResult();
            if (dropResult && item['currentColumnName'] === dropResult['name']) return
            if (dropResult && dropResult['name']) {
                changeItemColumn(item, dropResult['name'])
            }

        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        })
    })

    // Xử lý change Item giữa các Column
    const changeItemColumn = (currentItem, columnName) => {
        const indexColumnDrag = dataSource.findIndex(item => item.name === currentItem.currentColumnName)
        const indexColumnDrop = dataSource.findIndex(item => item.name === columnName)

        const coppiedItems = [...dataSource];
        const itemDrag = coppiedItems[indexColumnDrag].metaData.splice(currentItem.index, 1)

        coppiedItems[indexColumnDrop].metaData.push(itemDrag[0])
        setDataSource(coppiedItems)
    }

    const opacity = isDragging ? 0.4 : 1

    drag(drop(ref))

    return (
        <div ref={ref} className={className} style={{ opacity }}>
            {name}
        </div>
    );
};