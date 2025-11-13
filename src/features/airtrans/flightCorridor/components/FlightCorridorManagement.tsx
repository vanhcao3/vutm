import { useContext, useEffect, useState } from "react";
import { FlightCorridor, ValidateStatus } from "../types";
import { getAllFlightCorridors, updateFlightCorridor } from "../service/flightCorridorService";
import { SocketContext } from "@/lib/socket";
import "../style/flightCorridorStyle.scss";
import { convertValidateEnumToString } from "@/utils/convert";
import { IconButton } from "@mui/material";
import { CheckCircleOutline, Visibility } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/slices";
import { convertHubListToRecords } from "../../hub/utils/convert";
import { Hub } from "../../hub/types";
import { getAllHubs } from "../../hub/api/lockerService";

export const FlightCorridorManagement = () => {
     const [flightCorridorList, setFlightCorridorList] = useState<FlightCorridor[]>([]);
     const [isRefresh, setIsRefresh] = useState<boolean>(true);
     const socket = useContext(SocketContext);

     const [allHubRecords, setAllHubRecords] = useState<Record<string, Hub>>({});

     useEffect(() => {
          getAllHubs().then((res) => {
               const records = convertHubListToRecords(res);
               setAllHubRecords(records);
          });
     }, []);

     useEffect(() => {
          if (isRefresh) {
               getAllFlightCorridors().then((res) => {
                    setFlightCorridorList(res);
                    setIsRefresh(false);
               });
          }
     }, [isRefresh]);

     useEffect(() => {
          socket.on("order", () => {
               setIsRefresh(true);
          });
     }, [socket]);

     const handleApprove = (corridorId: string) => {
          const approveCorridor = flightCorridorList.find((item) => item.id === corridorId);
          if (approveCorridor) {
               updateFlightCorridor({
                    ...approveCorridor,
                    validate_status: ValidateStatus.APPROVED,
               }).then(() => {
                    toast.success("Đã phê duyệt hành lang bay");
               });
          }
     };

     return (
          <>
               <div style={{ fontSize: "37px", marginBottom: "18px" }}>Danh sách hành lang bay</div>
               <div className="flight-corridor-list-table">
                    <table>
                         <tr>
                              <th>Sở hữu</th>

                              <th>Ghi chú</th>

                              <th>Độ rộng (m)</th>
                              <th>Điểm bắt đầu</th>
                              <th>Điểm kết thúc</th>
                              <th>Trạng thái</th>

                              <th>Hành động</th>
                         </tr>
                         <tbody>
                              {flightCorridorList.map((item) => {
                                   console.log(item.locker_id_list);
                                   if (!item.locker_id_list) return <></>;
                                   return (
                                        <tr key={item.id}>
                                             <td>
                                                  {item.created_by === "f0" ? "VIETTEL POST" : ""}
                                             </td>
                                             <td>{item.description}</td>
                                             <td>{item.offset}</td>
                                             <td>
                                                  {item.locker_id_list &&
                                                       item.locker_id_list.length === 2 &&
                                                       allHubRecords[item.locker_id_list[0] || ""]
                                                            ?.name}
                                             </td>
                                             <td>
                                                  {item.locker_id_list &&
                                                       item.locker_id_list.length === 2 &&
                                                       allHubRecords[item.locker_id_list[1] || ""]
                                                            ?.name}
                                             </td>
                                             <td>{convertValidateEnumToString(2)}</td>
                                             <td>
                                                  <div style={{ textAlign: "center" }}>
                                                       <IconButton
                                                            onClick={() => handleApprove(item.id)}
                                                       >
                                                            <CheckCircleOutline />
                                                       </IconButton>

                                                       <IconButton
                                                            onClick={() => handleApprove(item.id)}
                                                       >
                                                            <Visibility />
                                                       </IconButton>
                                                  </div>
                                             </td>
                                        </tr>
                                   );
                              })}
                         </tbody>
                    </table>
               </div>
          </>
     );
};
