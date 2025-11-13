import { customAlphabet } from "nanoid";
import VietnamPostLogo from "@/assets/Vietnam_post_logo.png";
import ViettelLogo from "@/assets/images/logoViettel.png";
import BeLogo from "@/assets/be_logo.jpeg";
import GrabLogo from "@/assets/grab_logo.png";
import "../styles/supplierListStyle.scss";

const customNanoid = customAlphabet("123456789", 5);

const SUPPLIER = [
     { name: "VIETTEL", url: ViettelLogo },
     { name: "Việt Nam Post", url: VietnamPostLogo },
     { name: "BE", url: BeLogo },
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
     return SUPPLIER[supplierIndex];
};

export const SupplierListManagement = () => {
     return (
          <>
               <div style={{ fontSize: "37px", marginBottom: "18px" }}>Danh sách Nhà cung cấp</div>
               <div className="supplier-list-table">
                    <table>
                         <tr>
                              <th style={{ width: "10%" }}>ID</th>
                              <th style={{ width: "10%" }}>Nhà quản lý</th>
                              <th>Nhận diện</th>
                              <th>Số lượng Drone</th>
                              <th>Đường bay</th>
                              <th>Hành lang bay</th>
                              <th>Kế hoạch bay</th>
                              <th>Ghi chú</th>
                         </tr>

                         <tbody>
                              {SUPPLIER.map((supplier) => {
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
                              })}
                         </tbody>
                    </table>
               </div>
          </>
     );
};
