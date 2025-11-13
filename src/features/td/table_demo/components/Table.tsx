import { Switch } from "@mui/material";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const columns: GridColDef[] = [
     {
          field: "isConnected",
          headerName: "Connection Status",
          sortable: false,
          align: "center",
          headerAlign: "center",
          width: 200,
          // eslint-disable-next-line react/display-name
          renderCell: (params) => {
               const onChange = (e: any) => {
                    console.log("change switch ", e);
                    const item = rows.find((i) => i.id == e.id);
                    if (!item) return;
                    item.isConnected = !item?.isConnected ? false : true;
               };
               return (
                    <Switch
                         color="success"
                         checked={params.value ?? false}
                         onClick={(e) => onChange(params)}
                         inputProps={{ "aria-label": "controlled" }}
                    />
               );
          },
     },
     {
          field: "status",
          headerName: "Connection Status 2",
          headerAlign: "center",
          sortable: false,
          width: 200,
          align: "center",
          // eslint-disable-next-line react/display-name
          renderCell: (params) => {
               // const onClick = (e: any) => {
               //      e.stopPropagation(); // don't select this row after clicking

               //      const api: GridApi = params.api;
               //      const thisRow: Record<string, GridCellValue> = {};

               //      api.getAllColumns()
               //           .filter((c) => c.field !== "__check__" && !!c)
               //           .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

               //      return alert(JSON.stringify(thisRow, null, 4));
               // };

               return (
                    <FiberManualRecordIcon
                         fontSize="small"
                         sx={{
                              mr: 2,
                              color: params.value === "connected" ? "#4caf50" : "gray",
                         }}
                    />
               );
          },
     },
     { field: "id", headerName: "ID", width: 70, align: "center", headerAlign: "center" },
     {
          field: "firstName",
          headerName: "First name",
          width: 130,
          align: "center",
          headerAlign: "center",
     },
     {
          field: "lastName",
          headerName: "Last name",
          width: 130,
          align: "center",
          headerAlign: "center",
     },
     {
          field: "age",
          headerName: "Age",
          type: "number",
          width: 90,
          align: "center",
          headerAlign: "center",
     },
     {
          field: "fullName",
          headerName: "Full name",
          description: "This column has a value getter and is not sortable.",
          sortable: false,
          width: 160,
          align: "center",
          headerAlign: "center",
          valueGetter: (params) =>
               `${params.getValue(params.id, "firstName") || ""} ${
                    params.getValue(params.id, "lastName") || ""
               }`,
     },
];

const rows = [
     { id: 1, lastName: "Snow", firstName: "Jon", age: 35, isConnected: true, status: "connected" },
     {
          id: 2,
          lastName: "Lannister",
          firstName: "Cersei",
          age: 42,
          isConnected: false,
          status: "disconnected",
     },
     {
          id: 3,
          lastName: "Lannister",
          firstName: "Jaime",
          age: 45,
          isConnected: true,
          status: "connected",
     },
     { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
     { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
     { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
     { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
     { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
     { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export function DataGridDemo() {
     return (
          <div style={{ height: 400, width: "100vw" }}>
               <DataGrid rows={rows} columns={columns} pageSize={5} />
          </div>
     );
}
