import { useContext, useEffect, useState } from "react";
import { FlightLane, ValidateStatus } from "../types";
import { getAllFlightLanes, updateFlightLane } from "../service/flightCorridorService";
import { SocketContext } from "@/lib/socket";
import "../style/flightCorridorStyle.scss";
import { convertArrayToObject, convertValidateEnumToString } from "@/utils/convert";
import { IconButton } from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import { toast } from "react-toastify";
import { Hub } from "../../hub/types";
import { getAllHubs } from "../../hub/api/lockerService";

export const FlightLaneManagement = () => {
     const [flightLaneList, setFlightLaneList] = useState<FlightLane[]>([]);
     const [hubs, setHubs] = useState<Record<string, Hub>>({});
     const [isRefresh, setIsRefresh] = useState<boolean>(true);
     const socket = useContext(SocketContext);

     useEffect(() => {
          getAllHubs().then((res) => {
               const listHubAndLocker: Array<any> = [];
               res.forEach((hub) => {
                    listHubAndLocker.push(hub);
                    if (hub.lockers) {
                         hub.lockers.forEach((locker) => {
                              listHubAndLocker.push(locker);
                         });
                    }
               });

               setHubs(convertArrayToObject(listHubAndLocker));
          });
     }, []);

     useEffect(() => {
          if (isRefresh) {
               getAllFlightLanes().then((res) => {
                    const originalFlightLanes = res.filter(
                         (flightLane) => flightLane.created_by === "f0"
                    );
                    setFlightLaneList(originalFlightLanes);
                    setIsRefresh(false);
               });
          }
     }, [isRefresh]);

     useEffect(() => {
          socket.on("flight_lane", () => {
               setIsRefresh(true);
          });
     }, [socket]);

     const handleApprove = (laneId: string) => {
          const approveCorridor = flightLaneList.find((item) => item.id === laneId);
          if (approveCorridor) {
               updateFlightLane({
                    ...approveCorridor,
                    validate_status: ValidateStatus.APPROVED,
               }).then(() => {
                    toast.success("Đã phê duyệt hành lang bay");
               });
          }
     };

     return (
          <>
               <div style={{ fontSize: "37px", marginBottom: "18px" }}>Danh sách làn bay</div>
               <div className="flight-corridor-list-table">
                    <table>
                         <tr>
                              <th>Điểm bắt đầu</th>

                              <th>Điểm kết thúc</th>

                              <th>Độ rộng (m)</th>

                              <th>Trạng thái</th>

                              <th>Hành động</th>
                         </tr>
                         <tbody>
                              {flightLaneList.map((item) => {
                                   return (
                                        <tr key={item.id}>
                                             <td>{hubs[item.start_locker_id]?.name}</td>
                                             <td>{hubs[item.end_locker_id]?.name}</td>
                                             <td>{item.offset}</td>
                                             <td>{convertValidateEnumToString(2)}</td>
                                             <td>
                                                  <div style={{ textAlign: "center" }}>
                                                       <IconButton
                                                            onClick={() => handleApprove(item.id)}
                                                       >
                                                            <CheckCircleOutline
                                                                 sx={{ fill: "green" }}
                                                            />
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
