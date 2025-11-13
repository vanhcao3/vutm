import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export enum HeaderActionType {
    EDIT = 'edit',
    DELETE = 'delete',
    ADD = 'add',
    COPY = 'copy',
}

interface ItemActionProps {
    name: string,
    index: number,
    handleStatusDialog?: (value) => void;
    listDataTable?: any,
    dataSelected?: any,
    handleRemoveData?: (value) => void;
    handleEditData?: (value) => void;
    handleTypeAction?: (value) => void;
}

export const removeData = (listDataTable, dataSelected, handleRemoveData) => {
    let dataRow = listDataTable;
    dataSelected.forEach((data) => {
        return dataRow = dataRow.filter((item) => {
            return item.id !== data.id;
        })
    })
    handleRemoveData(dataRow)
}

export function itemAction(props: ItemActionProps) {
    const { name, index, handleStatusDialog, listDataTable, dataSelected, handleRemoveData, handleEditData, handleTypeAction } = props;
    switch (name) {
        case HeaderActionType.ADD:
            return (
                <div
                    role='presentation'
                    className='p-2 m-1 border border-black rounded-lg flex justify-center items-center cursor-pointer'
                    onClick={() => {
                        handleTypeAction(name);
                        handleStatusDialog(true)
                    }}
                    key={index}
                >
                    <AddCircleIcon fontSize="small" />
                </div>
            );
        case HeaderActionType.EDIT:
            return (
                <div
                    role='presentation'
                    className='p-2 m-1 border border-black rounded-lg flex justify-center items-center cursor-pointer'
                    onClick={() => {
                        handleTypeAction(name);
                        handleStatusDialog(true)
                    }}
                    key={index}
                >
                    <EditIcon fontSize="small" />
                </div>
            );
        case HeaderActionType.DELETE:
            return (
                <div
                    role='presentation'
                    className='p-2 m-1 border border-black rounded-lg flex justify-center items-center cursor-pointer'
                    onClick={() => {
                        handleTypeAction(name);
                        handleStatusDialog(true)
                        // removeData(listDataTable, dataSelected, handleRemoveData);
                    }}
                    key={index}
                >
                    <DeleteIcon fontSize="small" />
                </div>
            );
        case HeaderActionType.COPY:
            return (
                <div
                    role='presentation'
                    className='p-2 m-1 border border-black rounded-lg flex justify-center items-center cursor-pointer'
                    onClick={() => {
                        handleStatusDialog(true)
                        handleTypeAction(name);
                    }}
                    key={index}
                >
                    <ContentCopyIcon fontSize="small" />
                </div>
            );
    }

}