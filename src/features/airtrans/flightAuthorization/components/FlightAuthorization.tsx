import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Info } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { FlightAuthorizationDetail } from "./FlightAuthorizationDetail";
import { getAllFlightApprovals } from "../api/flightAuthorizationService";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
     [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
     },
     [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
     },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
     "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
     },
     "&:last-child td, &:last-child th": {
          border: 0,
     },
}));

const createData = (
     name: string,
     submitTime: number,
     droneNumber: number,
     startTime: number,
     endTime: number,
     contact: string,
     status: string
) => {
     return {
          name,
          submitTime,
          droneNumber,
          startTime,
          endTime,
          contact,
          status,
     };
};

const flightAuthorizationList = [
     createData(
          "AnhCV",
          new Date().getTime(),
          1,
          new Date().getTime(),
          moment.now(),
          "SDT: 0925920589",
          "Đã phê duyệt"
     ),
     createData(
          "CuongNV49",
          new Date().getTime(),
          1,
          new Date().getTime(),
          moment.now(),
          "SDT: 0925920589",
          "Đã phê duyệt"
     ),
];

export const FlightAuthorization = () => {
     const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

     const [flightApprovalList, setFlightApprovalList] = useState<Array<any>>([]);
     const [selectedApprovalDetailId, setSelectedApprovalDetailId] = useState<string>("");
     const flightApprovalListRef = useRef<Array<any>>(flightApprovalList);

     console.log("flightApprovalList", flightApprovalList);

     const getApprovalFlightList = () => {
          getAllFlightApprovals().then((res: any) => {
               if (res.data.length - 1 === flightApprovalListRef.current.length) {
                    console.log(
                         "res.data.length",
                         res.data.length,
                         flightApprovalListRef.current.length
                    );
                    const newData = res.data[res.data.length - 1];
                    toast.success(
                         `Phê duyệt tự động phép bay của ${newData.flight_authorization_proposal.operator.business_name}`
                    );
               }
               setFlightApprovalList(res.data);
               flightApprovalListRef.current = res.data;
          });
     };

     useEffect(() => {
          getApprovalFlightList();

          // toast.success(
          //      "Phê duyệt tự động phép bay của Công ty TNHH Công nghệ Hàng không Việt Nam từ 29/10/2025 đến 28/11/2025"
          // );
          const getApprovalListInterval = setInterval(() => {
               console.log("get list all");
               getApprovalFlightList();
          }, 1000);

          return () => {
               clearInterval(getApprovalListInterval);
          };
     }, []);

     const handleViewDetail = (id: string) => {
          setIsOpenDetail(true);
          setSelectedApprovalDetailId(id);
     };

     return (
          <>
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                         <TableHead>
                              <TableRow>
                                   <StyledTableCell>Thứ tự</StyledTableCell>
                                   <StyledTableCell>Tên tổ chức (cá nhân)</StyledTableCell>
                                   <StyledTableCell>Thời gian nộp</StyledTableCell>
                                   <StyledTableCell>Số lượng drone</StyledTableCell>
                                   <StyledTableCell>Thời gian bắt đầu</StyledTableCell>
                                   <StyledTableCell>Thời gian kết thúc</StyledTableCell>
                                   <StyledTableCell>Liên hệ</StyledTableCell>
                                   <StyledTableCell>Trạng thái</StyledTableCell>
                                   <StyledTableCell>Hành động</StyledTableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {flightApprovalList.map((row: any, index) => {
                                   return (
                                        <StyledTableRow key={row.id}>
                                             <StyledTableCell component={"th"} scope="row">
                                                  {index + 1}
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {
                                                       row.flight_authorization_proposal.operator
                                                            .business_name
                                                  }
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {moment(row.updated_at).format(
                                                       "HH:mm DD/MM/YYYY"
                                                  )}
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {row.flight_authorization_proposal.drones.length}
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {moment(
                                                       row.flight_authorization_proposal
                                                            .operating_duration.from_day
                                                  ).format("DD/MM/YYYY")}
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {moment(
                                                       row.flight_authorization_proposal
                                                            .operating_duration.to_day
                                                  ).format("DD/MM/YYYY")}
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {
                                                       row.flight_authorization_proposal.operator
                                                            .phone_number
                                                  }
                                             </StyledTableCell>
                                             <StyledTableCell
                                                  sx={{
                                                       color: "#27ff43",
                                                       fontWeight: "bold",
                                                       textTransform: "uppercase",
                                                  }}
                                             >
                                                  {"Phê duyệt tự động"}
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  <IconButton
                                                       onClick={() => handleViewDetail(row.id)}
                                                  >
                                                       <Info />
                                                  </IconButton>
                                             </StyledTableCell>
                                        </StyledTableRow>
                                   );
                              })}
                         </TableBody>
                    </Table>
               </TableContainer>
               {isOpenDetail && (
                    <FlightAuthorizationDetail
                         isOpen={isOpenDetail}
                         setIsOpen={setIsOpenDetail}
                         flightApprovalId={selectedApprovalDetailId}
                    />
               )}
          </>
     );
};
