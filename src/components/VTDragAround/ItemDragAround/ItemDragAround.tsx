import { useDrag } from "react-dnd"
import { useState } from "react";

interface ItemDragAroundProps {
    children: React.ReactNode;
    className?: string;
    initTop?: number,
    initLeft?: number
    onDrop?: (any) => void
}

interface itemsDragAroundData {
    top: number,
    left: number
}

export const ItemDragAround = ({ children, className, initTop, initLeft, onDrop }: ItemDragAroundProps) => {
    const [itemsDragAround, setItemsDragAround] = useState<itemsDragAroundData>({ top: initTop ?? 0, left: initLeft ?? 0 })

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'DragAround',
        item: { itemsDragAround, setItemsDragAround, onDrop },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [itemsDragAround])

    // Khi đang kéo thì ẩn vị trí cũ đi
    if (isDragging) {
        return <div ref={drag} />
    }

    return (
        <div
            ref={drag}
            className={`absolute ${className}`}
            style={{ left: itemsDragAround.left, top: itemsDragAround.top }}
        >
            {children}
        </div>
    )
}