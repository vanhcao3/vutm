import { VTTable } from "@/components/VTTable";
import { Button, IconButton } from "@mui/material";
import {
     AddCircleOutline,
     DeleteOutlined,
     EditOutlined,
     ContentCopyOutlined,
} from "@mui/icons-material";
export interface DataItem {
     uuid: string;
     description: string;
     unitPrice: number;
     quantity: number;
}

export function DemoTable() {
     const handleTest = (value: string) => console.log(value);

     const PAGE_SIZE = 3;

     const tableSetting = [
          {
               field: "id",
               headerName: "ID",
               width: 10,
               align: "center",
               headerAlign: "center",
          },
          {
               field: "firstName",
               headerName: "First name",
               width: 20,
               align: "center",
               headerAlign: "center",
          },
          {
               field: "lastName",
               headerName: "Last name",
               width: 20,
               align: "center",
               headerAlign: "center",
          },
          {
               field: "age",
               headerName: "Age",
               type: "number",
               width: 20,
               align: "center",
               headerAlign: "center",
          },
          {
               field: "action",
               headerName: "Action",
               align: "center",
               headerAlign: "center",
               width: 30,
               renderCell: (
                    <div>
                         <div role="presentation" onClick={() => console.log("Edit")}>
                              Edit
                         </div>
                    </div>
               ),
          },
     ];

     const tableData = [
          { id: "1", lastName: "Name 1", firstName: "Jon", age: 35 },
          { id: "2", lastName: "Name 2", firstName: "Jon", age: 35 },
          { id: "3", lastName: "Name 3", firstName: "Jon", age: 35 },
          { id: "4", lastName: "Name 4", firstName: "Jon", age: 35 },
          { id: "5", lastName: "Name 5", firstName: "Jon", age: 35 },
          { id: "6", lastName: "Name 6", firstName: "Jon", age: 35 },
     ];
     const handleClickCreate = () => {
          console.log("handleClickCreate");
     };
     const handleClickUpdate = () => {
          console.log("handleClickUpdate");
     };
     const handleClickDelete = () => {
          console.log("handleClickDelete");
     };
     const handleClickCopy = () => {
          console.log("handleClickCopy");
     };
     const headerAction = [
          {
               name: "add",
               title: "Add Row",
               component: (
                    <IconButton onClick={handleClickCreate}>
                         <AddCircleOutline />
                    </IconButton>
               ),
          },
          {
               name: "edit",
               title: "Edit Row",
               component: (
                    <IconButton onClick={handleClickUpdate}>
                         <EditOutlined />
                    </IconButton>
               ),
          },
          {
               name: "copy",
               title: "Copy Row",
               component: (
                    <IconButton onClick={handleClickCopy}>
                         <ContentCopyOutlined />
                    </IconButton>
               ),
          },
          {
               name: "delete",
               title: "Delete Row",
               component: (
                    <IconButton onClick={handleClickDelete}>
                         <DeleteOutlined />
                    </IconButton>
               ),
          },
     ];

     const rowDoubleClick = (e) => {
          console.log("rowDoubleClick:", e);
     };

     const rowClick = (e) => {
          console.log("rowClick:", e);
     };
     const rowDeselect = (e) => {
          console.log("rowDeselect:", e);
     };
     return (
          <div>
               Table
               <VTTable
                    onRowDoubleClick={rowDoubleClick}
                    onRowClick={rowClick}
                    onRowDeselect={rowDeselect}
                    tableData={tableData}
                    tableSetting={tableSetting}
                    pageSize={PAGE_SIZE}
                    headerAction={headerAction}
                    multiSelect={false}
               />
          </div>
     );
}
