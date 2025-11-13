import {
     Checkbox,
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TableRow,
} from "@mui/material";
import { ReorderOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { CustomPagination } from "./component/Pagination";
import VTNotificationDialog from "../VTNotificationDialog";
import { onDragEnd, onDragOver, onDragStart } from "./services/DragTable";
import {
     handleIndeterminateSelect,
     setAllSelected,
     statusAllChecked,
} from "./services/CheckboxTable";
import { itemAction } from "./component/HeaderAction";

interface headerActionProps {
     /**
      * Tên button
      */
     name: string;
     /**
      * Tên title dialog
      */
     title?: string;
     /**
      * @param onClose : function để đóng dialog
      * @returns Children
      */
     component: React.ReactNode | JSX.Element;
}

interface VTTableProps {
     /**
      * Chọn nhiều row
      * @default true
      */
     multiSelect?: boolean;

     /**
      * Data của table
      */
     tableData: any;

     /**
      * Header Table
      */
     tableSetting: any;

     /**
      * Số lượng data hiển thị trên 1 page
      */
     pageSize: number;

     /**
      * Button action có sẵn
      */
     headerAction: headerActionProps[];

     /**
      * DoubleClick function
      */
     onRowDoubleClick?: any;

     /**
      * RowSelect function
      */
     onRowClick?: any;

     /**
      * RowDeSelect function
      */
     onRowDeselect?: any;

     /**
      * Drag row table
      * defaut: false
      */
     isDrag?: boolean;
}

/**
 * isDrag = true: nhớ thay đổi width trong tableSetting các cột
 * width column isDrag default = 5%
 */

export function VTTable(props: VTTableProps) {
     const {
          multiSelect = true,
          tableData,
          tableSetting,
          isDrag = false,
          pageSize = 5,
          headerAction,
          onRowDoubleClick,
          onRowClick,
          onRowDeselect,
     } = props;
     const [listDataTable, setListDataTable] = useState(tableData);
     useEffect(() => {
          setListDataTable(tableData);
     }, [tableData]);
     const createArrayChecked = () => {
          const listChecked = [];
          for (let i = 0; i < tableData.length; i++) {
               listChecked.push(false);
          }
          return listChecked;
     };
     const [draggableItem, setDraggableItem] = useState();
     const [currentPage, setCurrentPage] = useState(1);
     const [listChecked, setListChecked] = useState(createArrayChecked());
     const [dataSelected, setDataSelected] = useState([]);
     const [isOpenDialog, setIsOpenDialog] = useState(false);
     const [typeAction, setTypeAction] = useState("add");
     const PAGE_SIZE = pageSize;

     const lastData = currentPage * PAGE_SIZE;
     const firstData = lastData - PAGE_SIZE;
     const currentData = listDataTable.slice(firstData, lastData);

     const [dragData, setDragData] = useState(currentData);

     const handleAddData = (value) => {
          setListDataTable((pre) => [value, ...pre]);
     };

     const handleRemoveData = (value) => {
          setListDataTable(value);
     };

     /**
      * Sửa Data trong tableData
      */
     const handleEditData = (value) => {
          console.log("value", value);
          // setListDataTable(value);
     };

     const handleStatusDialog = (value) => {
          setIsOpenDialog(value);
     };

     const handleTypeAction = (value) => {
          setTypeAction(value);
     };

     /**
      * Hàm thay đổi trang
      * @param pageNumber : trang
      */
     const handlePage = (pageNumber) => {
          setCurrentPage(pageNumber);
     };

     const handleDraggableItem = (value) => {
          setDraggableItem(value);
     };

     const handleDragData = (value) => {
          setDragData(value);
     };

     /**
      * Hàm xử lý: xóa data đã chọn
      */
     const removeDataSelected = (id: string) => {
          const currenDataSelect = dataSelected.filter((item) => item.id !== id);
          handleDataSelected(currenDataSelect);
     };

     const handleListCheck = (value) => {
          setListChecked(value);
     };

     const handleDataSelected = (value) => {
          setDataSelected(value);
     };

     useEffect(() => {
          console.log("currentData", currentData, currentPage);
          if (currentData.length === 0) {
               setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
          }
          setDragData(currentData);
     }, [currentPage, listDataTable]);

     const handleRowClick = (item, index) => {
          if (!multiSelect) {
               let newListChecked = createArrayChecked();
               newListChecked[index] = !listChecked[index];
               setListChecked(newListChecked);
               if (newListChecked[index]) {
                    onRowClick(item);
               } else {
                    onRowDeselect(item);
               }
          } else {
               onRowClick(item);
          }
     };
     return (
          <div style={{ height: 370 }}>
               <div className="flex justify-end pb-2">
                    {headerAction.map((item, index) => {
                         return <div key={index}>{item.component}</div>;
                    })}
               </div>
               <TableContainer>
                    <Table>
                         <colgroup>
                              {isDrag && <col style={{ width: "5%" }} />}
                              {multiSelect && <col style={{ width: "5%" }} />}
                              {tableSetting.map((item, index) => (
                                   <col key={index} style={{ width: `${item.width}%` }} />
                              ))}
                         </colgroup>
                         <TableHead>
                              <TableRow>
                                   {isDrag && <TableCell align="left">&nbsp;</TableCell>}
                                   {multiSelect && (
                                        <TableCell align="left">
                                             <Checkbox
                                                  checked={statusAllChecked({
                                                       type: "checkAll",
                                                       totalItem: listDataTable.length,
                                                       listChecked: listChecked,
                                                  })}
                                                  onChange={(e, checked) =>
                                                       setAllSelected({
                                                            checked,
                                                            dragData,
                                                            listChecked,
                                                            handleListCheck,
                                                            handleDataSelected,
                                                            listDataTable,
                                                       })
                                                  }
                                                  indeterminate={statusAllChecked({
                                                       type: "indeterminate",
                                                       totalItem: listDataTable.length,
                                                       listChecked: listChecked,
                                                  })}
                                             />
                                        </TableCell>
                                   )}
                                   <TableCell style={{ width: "4%" }}>STT</TableCell>
                                   {tableSetting.map((item, index) => (
                                        <TableCell key={index} align={item.headerAlign}>
                                             {item.headerName}
                                        </TableCell>
                                   ))}
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {dragData.map((item, index) => {
                                   if (item === null) {
                                        return <></>;
                                   }
                                   index = index + (currentPage - 1) * PAGE_SIZE;
                                   return (
                                        <TableRow
                                             key={index}
                                             onDragOver={(e) =>
                                                  onDragOver(
                                                       e,
                                                       index,
                                                       dragData,
                                                       draggableItem,
                                                       handleDragData
                                                  )
                                             }
                                             onDoubleClick={() => onRowDoubleClick(item)}
                                             onClick={(e) => {
                                                  handleRowClick(item, index);
                                             }}
                                             hover
                                             selected={listChecked[index]}
                                        >
                                             {multiSelect && (
                                                  <TableCell align="left">
                                                       <div
                                                            className="z-50"
                                                            role="presentation"
                                                            onClick={(e) => {
                                                                 e.stopPropagation();
                                                            }}
                                                       >
                                                            <Checkbox
                                                                 checked={listChecked[index]}
                                                                 onChange={(e, checked) => {
                                                                      if (checked) {
                                                                           setDataSelected(
                                                                                (prev) => [
                                                                                     ...prev,
                                                                                     item,
                                                                                ]
                                                                           );
                                                                      } else {
                                                                           removeDataSelected(
                                                                                item.id
                                                                           );
                                                                      }
                                                                      handleIndeterminateSelect({
                                                                           index,
                                                                           checked,
                                                                           listChecked,
                                                                           handleListCheck,
                                                                      });
                                                                 }}
                                                            />
                                                       </div>
                                                  </TableCell>
                                             )}
                                             {isDrag && (
                                                  <TableCell
                                                       align="left"
                                                       draggable
                                                       onDragStart={(e) =>
                                                            onDragStart(
                                                                 e,
                                                                 index,
                                                                 handleDraggableItem,
                                                                 dragData
                                                            )
                                                       }
                                                       onDragEnd={() =>
                                                            onDragEnd(handleDraggableItem)
                                                       }
                                                  >
                                                       <div className="drag">
                                                            <ReorderOutlined />
                                                       </div>
                                                  </TableCell>
                                             )}
                                             <TableCell style={{ width: "4%" }}>
                                                  {index + 1}
                                             </TableCell>
                                             {tableSetting.map((element, index2) => {
                                                  return (
                                                       <TableCell
                                                            key={index2}
                                                            align={element.align}
                                                       >
                                                            {element.renderCell
                                                                 ? element.renderCell
                                                                 : item[`${element.field}`]}
                                                       </TableCell>
                                                  );
                                             })}
                                        </TableRow>
                                   );
                              })}
                         </TableBody>
                    </Table>
               </TableContainer>
               <CustomPagination
                    currentPage={currentPage}
                    onPageChange={handlePage}
                    totalItems={listDataTable.length}
                    pageSize={PAGE_SIZE}
               />
          </div>
     );
}
