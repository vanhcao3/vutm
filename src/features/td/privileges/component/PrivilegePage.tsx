import { AlertDialog } from "@/components/AlertDialog/AlertDialog";
import { TablePaginationActions } from "@/components/TablePaginationActions/TablePaginationActions";
import { AddCircleOutline, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import {
     Box,
     IconButton,
     Paper,
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableFooter,
     TableHead,
     TablePagination,
     TableRow,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { usePrivileges } from "../hook/usePrivileges";
import "../styles/index.scss";
import { Privilege } from "../type";
import { PrivilegeDialog } from "./PrivilegeDialog";

enum Action {
     Create = "create",
     Update = "update",
}

export const PrivilegePage = () => {
     const { t } = useTranslation();
     const usePrivilege = usePrivileges();
     const { privileges } = useSelector((state: any) => state.drawer);

     const [page, setPage] = useState(0);
     const [rowsPerPage, setRowPerPage] = useState(5);
     const [openDialog, setOpenDialog] = useState(false);
     const [action, setAction] = useState("");
     const [selectedPrivilege, setSelectedPrivilege] = useState<Privilege | null>(null);
     const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

     const emptyRows =
          page > 0
               ? Math.max(0, (1 + page) * rowsPerPage - (usePrivilege.get.data?.length ?? 0))
               : 0;

     const handleChangePage = (
          event: React.MouseEvent<HTMLButtonElement> | null,
          newPage: number
     ) => {
          setPage(newPage);
     };

     const handleChangeRowsPerPage = (
          event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
     ) => {
          setRowPerPage(parseInt(event.target.value, 10));
          setPage(0);
     };

     const handleOnClickRow = (index: number) => {
          const sp = (privileges as Privilege[])[index + rowsPerPage * page];
          if (sp) {
               if (JSON.stringify(sp) === JSON.stringify(selectedPrivilege)) {
                    setSelectedPrivilege(null);
               } else {
                    setSelectedPrivilege(sp);
               }
          }
     };

     const handleClickCreate = () => {
          setAction(Action.Create);
          setOpenDialog(true);
     };

     const handleClickUpdate = () => {
          setAction(Action.Update);
          setOpenDialog(true);
     };

     const handleClickDelete = () => {
          setOpenDeleteConfirm(true);
     };

     const getNamePrivilegeById = (id: string): string => {
          const sp = (privileges as Privilege[]).find((item) => item.id === id);
          return sp ? sp.name : "";
     };
     return (
          <Box sx={{ margin: "1.5em" }}>
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }}>
                         <TableHead>
                              <TableRow>
                                   <TableCell
                                        className={"HeaderCell"}
                                        style={{ width: "4%" }}
                                        component="th"
                                        scope="row"
                                   >
                                        {t("STT")}
                                   </TableCell>
                                   <TableCell className={"HeaderCell"} component="th" scope="row">
                                        {t("privilege.code")}
                                   </TableCell>
                                   <TableCell className={"HeaderCell"} style={{ width: "30%" }}>
                                        {t("privilege.name")}
                                   </TableCell>
                                   <TableCell className={"HeaderCell"} style={{ width: "30%" }}>
                                        {t("privilege.parent")}
                                   </TableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {(rowsPerPage > 0
                                   ? usePrivilege.get.data?.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                   )
                                   : usePrivilege.get.data
                              )?.map((row, index) => (
                                   <TableRow
                                        hover
                                        key={index}
                                        onClick={() => handleOnClickRow(index)}
                                        selected={row.id === selectedPrivilege?.id ? true : false}
                                   >
                                        <TableCell style={{ width: "4%" }}>
                                             {index + 1 + rowsPerPage * page}
                                        </TableCell>
                                        <TableCell style={{ width: "30%" }}>{row.code}</TableCell>
                                        <TableCell style={{ width: "30%" }}>{row.name}</TableCell>
                                        <TableCell style={{ width: "30%" }}>
                                             {getNamePrivilegeById(row.parent_id ?? "")}
                                        </TableCell>
                                   </TableRow>
                              ))}
                              {emptyRows > 0 && (
                                   <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                   </TableRow>
                              )}
                         </TableBody>
                         <TableFooter>
                              <TableRow className={"TableFooter"}>
                                   <TablePagination
                                        labelRowsPerPage={"PAGE"}
                                        rowsPerPageOptions={[
                                             5,
                                             10,
                                             25,
                                             { label: "All", value: -1 },
                                        ]}
                                        colSpan={3}
                                        count={usePrivilege.get.data?.length ?? 0}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                   />
                                   <TableCell align={"right"}>
                                        <IconButton onClick={handleClickCreate}>
                                             <AddCircleOutline />
                                        </IconButton>
                                        {selectedPrivilege !== null && (
                                             <IconButton onClick={handleClickUpdate}>
                                                  <EditOutlined />
                                             </IconButton>
                                        )}
                                        {selectedPrivilege !== null && (
                                             <IconButton onClick={handleClickDelete}>
                                                  <DeleteOutlined />
                                             </IconButton>
                                        )}
                                   </TableCell>
                              </TableRow>
                         </TableFooter>
                    </Table>
               </TableContainer>

               <PrivilegeDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    action={action}
                    initValue={action !== Action.Create ? selectedPrivilege : null}
               />

               <AlertDialog
                    title={t("privilege.deleteTitle")}
                    content={t("privilege.deleteContent")}
                    open={openDeleteConfirm}
                    onClose={() => setOpenDeleteConfirm(false)}
                    onAgree={() => {
                         if (selectedPrivilege?.id)
                              usePrivilege.deleteFn.mutate(selectedPrivilege?.id);
                         setOpenDeleteConfirm(false);
                    }}
               />
          </Box>
     );
};
