import { customAlphabet, nanoid } from "nanoid";
import VietnamPostLogo from "@/assets/Vietnam_post_logo.png";
import ViettelLogo from "@/assets/images/logoViettel.png";
import BeLogo from "@/assets/be_logo.jpeg";
import GrabLogo from "@/assets/grab_logo.png";
import "../styles/lockerStyle.scss";

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

const lockerList = [
     { address: "Tòa nhà Viettel High Tech Hòa Lạc" },
     { address: "Kho M1" },
     { address: "Kho M3" },
     { address: "Tòa nhà Viettel High Tech 380LLQ" },
];

export const LockerManagement = () => {
     return (
          <>
               <div style={{ fontSize: "37px", marginBottom: "18px" }}>Danh sách Locker</div>
               <div className="supplier-list-table">
                    <table>
                         <tr>
                              <th style={{ width: "10%" }}>ID</th>
                              <th>Địa chỉ</th>
                              <th>Mô tả</th>
                              <th style={{ width: "10%" }}>Số lượng ngăn</th>
                         </tr>

                         <tbody>
                              {lockerList.map((locker) => {
                                   return (
                                        <tr key={nanoid()}>
                                             <td>{customNanoid()}</td>
                                             <td>{locker.address}</td>
                                             <td></td>
                                             <td>{Math.floor(Math.random() * 20)}</td>
                                        </tr>
                                   );
                              })}
                         </tbody>
                    </table>
               </div>
          </>
     );
};
