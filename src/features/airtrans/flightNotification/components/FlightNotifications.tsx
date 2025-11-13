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
import { useEffect, useState } from "react";
import { FlightNotificationDetail } from "./FlightNotificationDetail";
import { FlightNotification } from "../types/FlightNotification";
import { getAllFlightNotifications } from "../api/flightNotificationService";
import { FlightNotificationCollision } from "./FlightNotificationCollision";
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

export const FlightNotifications = () => {
     const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

     const [flightNotifications, setFlightNotifications] = useState<FlightNotification[]>([]);
     const [flightNotificationDetailId, setFlightNotificationDetailId] =
          useState<string>(undefined);

     useEffect(() => {
          getAllFlightNotifications()
               .then((res) => {
                    setFlightNotifications(res?.data);
               })
               .catch((err) => {
                    console.error(err);
               });
     }, []);

     const handleViewDetail = (id: string): void => {
          setFlightNotificationDetailId(id);
          setIsOpenDetail(true);
     };

     return (
          <>
               {/* <FlightNotificationCollision /> */}
               <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                         <TableHead>
                              <TableRow>
                                   <StyledTableCell>Thứ tự</StyledTableCell>
                                   <StyledTableCell>Tên cá nhân (tổ chức)</StyledTableCell>
                                   <StyledTableCell>Mã drone</StyledTableCell>
                                   <StyledTableCell>Mã đăng ký drone</StyledTableCell>
                                   <StyledTableCell>Số khu vực bay</StyledTableCell>
                                   <StyledTableCell>Ngày bắt đầu</StyledTableCell>
                                   <StyledTableCell>Ngày kết thúc</StyledTableCell>
                                   <StyledTableCell>Trạng thái</StyledTableCell>
                                   <StyledTableCell>Hành động</StyledTableCell>
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {flightNotifications?.map((row, index) => {
                                   return (
                                        <StyledTableRow key={row.id}>
                                             <StyledTableCell component={"th"} scope="row">
                                                  {index + 1}
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {
                                                       row.flight_authorization_approval
                                                            .flight_authorization_proposal?.operator
                                                            ?.business_name
                                                  }
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {row.flight_authorization_approval
                                                       ?.flight_authorization_proposal?.drones
                                                       ?.length &&
                                                       row.flight_authorization_approval
                                                            ?.flight_authorization_proposal
                                                            ?.drones[0].drone_registration
                                                            ?.factory_number}
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {row.flight_authorization_approval
                                                       ?.flight_authorization_proposal?.drones
                                                       ?.length &&
                                                       row.flight_authorization_approval
                                                            ?.flight_authorization_proposal
                                                            ?.drones[0].drone_registration
                                                            ?.registration_number}
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {row.intended_flight_area?.length}
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {moment(
                                                       row.intended_operating_duration?.from_day
                                                  ).format("YYYY-MM-DD HH:mm:ss")}
                                             </StyledTableCell>
                                             <StyledTableCell>
                                                  {moment(
                                                       row.intended_operating_duration?.to_day
                                                  ).format("YYYY-MM-DD HH:mm:ss")}
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
                    <FlightNotificationDetail
                         isOpen={isOpenDetail}
                         setIsOpen={setIsOpenDetail}
                         flightNotificationId={flightNotificationDetailId}
                    />
               )}
          </>
     );
};
