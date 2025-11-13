import { customAlphabet } from "nanoid";
import VietnamPostLogo from "@/assets/Vietnam_post_logo.png";
import ViettelLogo from "@/assets/images/logoViettel.png";
import BeLogo from "@/assets/be_logo.jpeg";
import GrabLogo from "@/assets/grab_logo.png";
import "../styles/droneListStyle.scss";
import { useContext, useEffect, useState } from "react";
import { getAllListDrone } from "../api/droneListService";
import { DroneInfo } from "../../drones/types";
import { IconButton } from "@mui/material";
import { CheckCircleOutline, Visibility } from "@mui/icons-material";
import { SocketContext } from "@/lib/socket";

const customNanoid = customAlphabet("123456789", 5);

const SUPPLIER = [
     { name: "VIETTEL", url: ViettelLogo },
     { name: "Việt Nam Post", url: VietnamPostLogo },
     // { name: "BE", url: BeLogo },
     { name: "Grab", url: GrabLogo },
];

const ACTIVE_STATUS = [
     { name: "TẬP KẾT", value: "static" },
     { name: "GIAO HÀNG", value: "activated" },
];

const getRandomActiveStatus = () => {
     const supplierIndex = Math.floor(Math.random() * ACTIVE_STATUS.length);
     return ACTIVE_STATUS[supplierIndex];
};

const getRandomSupplier = () => {
     const supplierIndex = Math.floor(Math.random() * SUPPLIER.length);
     return SUPPLIER[0];
};

export const DroneListManagement = () => {
     const [isRefresh, setIsRefresh] = useState<boolean>(true);
     const [droneList, setDroneList] = useState<DroneInfo[]>([]);
     const socketContext = useContext(SocketContext);

     useEffect(() => {
          if (isRefresh) {
               getAllListDrone().then((res) => {
                    setDroneList(res);
               });
          }
          setIsRefresh(false);
     }, [isRefresh]);

     useEffect(() => {
          socketContext.on("drone", () => {
               setIsRefresh(true);
          });
     }, [socketContext]);

     return (
          <>
               <div style={{ fontSize: "37px", marginBottom: "18px" }}>Danh sách Drone</div>
               <div className="filter-zone">
                    <div className="filter-field">
                         <div className="filter-label">Nhà cung cấp</div>
                         <input className="filter-input" />
                    </div>
               </div>
               <div className="drone-list-table">
                    <table>
                         <tr>
                              <th>Remote ID</th>
                              <th>Nhà quản lý</th>
                              <th>Tên</th>
                              <th>Tải trọng tối đa (kg)</th>
                              <th>Pin (h)</th>
                              <th>Tốc độ tối đa (m/s)</th>
                              <th>Khối lượng (kg)</th>
                              {/* <th>#Đơn đã giao</th> */}
                              <th>Hoạt động</th>
                              <th>Trạng thái</th>
                              <th>Hành động</th>
                         </tr>

                         <tbody>
                              {droneList.map((droneInfo) => {
                                   return (
                                        <tr key={droneInfo.id}>
                                             <td>{droneInfo.id}</td>
                                             <td>
                                                  <img
                                                       style={{ width: "80px", margin: "auto" }}
                                                       src={getRandomSupplier().url}
                                                       alt={"SUP"}
                                                  />
                                             </td>

                                             <td>{droneInfo.rtsp_link}</td>
                                             <td>{droneInfo.max_payload}</td>
                                             <td>{droneInfo.max_battery}</td>
                                             <td>{droneInfo.max_speed}</td>
                                             <td>{droneInfo.mass}</td>
                                             <td>{getRandomActiveStatus().name}</td>
                                             <td>{"ĐÃ PHÊ DUYỆT"}</td>
                                             <td>
                                                  <div style={{ textAlign: "center" }}>
                                                       <IconButton disabled>
                                                            <CheckCircleOutline
                                                                 sx={{
                                                                      fill: "green",
                                                                 }}
                                                            />
                                                       </IconButton>
                                                       <IconButton>
                                                            <Visibility sx={{}} />
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
