import { useDrop } from "react-dnd";
interface VTDragAroundContainerProps {
    className?: string;
    children?: React.ReactNode
}

export const VTDragAroundContainer = ({ className, children }: VTDragAroundContainerProps) => {
    const [, drop] = useDrop(() => ({
        accept: 'DragAround',
        drop(item: any, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.itemsDragAround.left + delta.x)
            const top = Math.round(item.itemsDragAround.top + delta.y)
            item.setItemsDragAround({ ...item.itemsDragAround, left, top })
            item.onDrop && item.onDrop({ left, top })
            return undefined
        }
    }), [])

    return (
        <div ref={drop} className={`relative w-full h-full ${className}`}>
            {children}
        </div>
    );
};