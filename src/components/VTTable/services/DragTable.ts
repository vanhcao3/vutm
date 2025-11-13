/**
     * Hàm Drag lấy row trong table
     */
export const onDragStart = (e, index, handleDraggableItem, dragData) => {
    // setDraggableItem(dragData[index])
    handleDraggableItem(dragData[index])
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20)
}

/**
 * Hàm di chuyển vị trí row trong table
 */
export const onDragOver = (e, index, dragData, draggableItem, handleDragData) => {
    e.preventDefault();
    const draggableOverItem = dragData[index];
    if (draggableItem === draggableOverItem) {
        return;
    }
    const items = dragData.filter(item => (item !== draggableItem));
    items.splice(index, 0, draggableItem);
    // setDragData(items);
    handleDragData(items);
}

/**
 * Hàm thực thi khi Drag xong
 */
export const onDragEnd = (handleDraggableItem) => {
    // setDraggableItem(null);
    handleDraggableItem(null);
}