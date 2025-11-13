import { customAlphabet } from "nanoid";
import VietnamPostLogo from "@/assets/Vietnam_post_logo.png";
import ViettelLogo from "@/assets/images/logoViettel.png";
import BeLogo from "@/assets/be_logo.jpeg";
import GrabLogo from "@/assets/grab_logo.png";
import "../styles/receiveCommandListStyle.scss";
import { convertTimeToDate } from "@/utils/convert";

const customNanoid = customAlphabet("123456789", 5);

const SUPPLIER = [
     { name: "VIETTEL", url: ViettelLogo },
     { name: "Việt Nam Post", url: VietnamPostLogo },
     { name: "BE", url: BeLogo },
     { name: "Grab", url: GrabLogo },
];

const RECEIVED_COMMAND = [
     {
          index: 1,
          src: "Cục Quản lý điều hành bay",
          content: "Dừng bay từ ngày 30/08/2025 đến hết 02/09/2025",
          date: convertTimeToDate(1756369058),
          status: "Đã xác nhận",
     },
];

const ACTIVE_STATUS = [
     { name: "TẬP KẾT", value: "static" },
     { name: "GIAO HÀNG", value: "activated" },
];

export const ReceiveCommandManagement = () => {
     return (
          <>
               <div style={{ fontSize: "37px", marginBottom: "18px" }}>Danh sách chỉ thị</div>
               <div className="receive-command-list-table">
                    <table>
                         <tr>
                              <th style={{ width: "3%" }}>ID</th>
                              <th style={{ width: "15%" }}>Nơi gửi</th>
                              <th> Nội dung </th>
                              <th> Thời gian </th>
                              <th> Trạng thái </th>
                         </tr>

                         <tbody>
                              {RECEIVED_COMMAND.map((command) => {
                                   return (
                                        <tr key={command.index}>
                                             <td>{command.index}</td>
                                             <td>{command.src}</td>
                                             <td>{command.content}</td>
                                             <td>{command.date}</td>
                                             <td>
                                                  <span
                                                       style={{
                                                            fontWeight: "bolder",
                                                            color:
                                                                 command.status === "Đã xác nhận"
                                                                      ? "#1ddd1d"
                                                                      : "yellow",
                                                       }}
                                                  >
                                                       {command.status}
                                                  </span>
                                             </td>
                                        </tr>
                                   );
                              })}
                              {/* {SUPPLIER.map((supplier) => {
                                   return (
                                        <tr key={supplier.name}>
                                             <td style={{ width: "10%" }}>{customNanoid()}</td>
                                             <td style={{ width: "10%" }}>{supplier.name}</td>
                                             <td>
                                                  <img
                                                       style={{ width: "80px", margin: "auto" }}
                                                       src={supplier.url}
                                                       alt={supplier.name}
                                                  />
                                             </td>
                                             <td>{Math.floor(Math.random() * 30)}</td>
                                             <td>
                                                  <span
                                                       style={{
                                                            textDecoration: "underline",
                                                            color: "#78e1f3",
                                                            cursor: "pointer",
                                                       }}
                                                  >
                                                       Chi tiết
                                                  </span>
                                             </td>
                                             <td>
                                                  <span
                                                       style={{
                                                            textDecoration: "underline",
                                                            color: "#78e1f3",
                                                            cursor: "pointer",
                                                       }}
                                                  >
                                                       Chi tiết
                                                  </span>
                                             </td>
                                             <td>
                                                  <span
                                                       style={{
                                                            textDecoration: "underline",
                                                            color: "#78e1f3",
                                                            cursor: "pointer",
                                                       }}
                                                  >
                                                       Chi tiết
                                                  </span>
                                             </td>
                                             <td></td>
                                        </tr>
                                   );
                              })} */}
                         </tbody>
                    </table>
               </div>
          </>
     );
};
