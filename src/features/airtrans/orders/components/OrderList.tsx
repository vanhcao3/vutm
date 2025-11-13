import { useEffect, useState } from "react";
import "../styles/orderStyle.scss";
import { Order } from "../types";
import { getAllOrders } from "../api/orderService";
import { convertTimeToDate } from "@/utils/convert";
import ViettelImg from "@/assets/images/logoViettel.png";
import DroneImg from "@/assets/drone-delivery.png";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { Box } from "@mui/material";
import { customAlphabet } from "nanoid";
import VietnamPostLogo from "@/assets/Vietnam_post_logo.png";
import GrabLogo from "@/assets/grab_logo.png";
import BeLogo from "@/assets/be_logo.jpeg";

const customNanoid = customAlphabet("123456789", 5);

const SUPPLIER = [
     { name: "VIETTEL", url: ViettelImg },
     { name: "Việt Nam Post", url: VietnamPostLogo },
     // { name: "BE", url: BeLogo },
     { name: "Grab", url: GrabLogo },
];

const getRandomSupplier = () => {
     const supplierIndex = Math.floor(Math.random() * SUPPLIER.length);
     return SUPPLIER[supplierIndex];
};

const HUB_SAMPLE = [
     { name: "Học viện Viettel", value: "HV_VT" },
     { name: "Kho M1", value: "M1" },
     { name: "Viettel 20 tầng", value: "VHT_20" },
];

const SUPPLIER_SAMPLE = [
     { name: "ViettelPost", value: "VTP" },
     { name: "VNPost", value: "VNP" },
];

const SIZE = [
     { name: "S", value: "S" },
     { name: "M", value: "M" },
     { name: "L", value: "L" },
];

const SAMPLE_STATUS = [
     { name: "Đang đến", value: "IN_COMING" },
     { name: "Đang giao", value: "IN_DELIVERY" },
     { name: "Đã giao", value: "DELIVERED" },
];

const SAMPLE_DATA_DONUT = [
     { label: "VIETTEL", value: 30, color: "red" },
     { label: "VNPOST", value: 20, color: "#d3d31e" },
     { label: "GRAB", value: 20, color: "green" },
     { label: "BE", value: 10, color: "blue" },
];

const USER_SAMPLE = ["hunglq", "vietpx", "huyendt"];

function CenteredDivImage({ size = 50 }) {
     const { width, height, left, top } = useDrawingArea();
     const cx = left + width / 2;
     const cy = top + height / 2;
     return (
          <foreignObject x={cx - size / 2} y={cy - size / 2} width={size} height={size}>
               <Box
                    sx={{
                         width: "100%",
                         height: "100%",
                         backgroundImage: `url(${DroneImg})`,
                         backgroundSize: "cover",
                         backgroundPosition: "center",
                         borderRadius: "50%",
                    }}
               />
          </foreignObject>
     );
}
export const OrderList = () => {
     const [currentOrders, setCurrentOrders] = useState<Order[]>([]);

     useEffect(() => {
          getAllOrders().then((res) => {
               setCurrentOrders(res);
          });
     }, []);

     useEffect(() => {
          const intervalGet = setInterval(() => {
               getAllOrders().then((res) => {
                    setCurrentOrders(res);
               });
          }, 5000);

          return () => {
               clearInterval(intervalGet);
          };
     }, []);

     return (
          <div className="order-wrapper">
               {/* <div style={{ fontSize: "29px", marginBottom: "20px" }}>Thống kê</div> */}
               <div className="order-overview" style={{ marginTop: "30px" }}>
                    <div className="order-stats">
                         <div style={{ width: "70%" }}>
                              <PieChart
                                   series={[
                                        {
                                             innerRadius: 50,
                                             outerRadius: 100,
                                             data: [...SAMPLE_DATA_DONUT],
                                             arcLabel: "value",
                                             paddingAngle: 5,
                                        },
                                   ]}
                                   margin={{ right: 5 }}
                                   width={200}
                                   height={200}
                                   hideLegend
                                   sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                             fill: "white",
                                        },
                                   }}
                              >
                                   <CenteredDivImage size={70} />
                              </PieChart>
                         </div>
                         <div
                              style={{
                                   width: "30%",
                                   display: "flex",
                                   flexDirection: "column",
                                   gap: "5px",
                              }}
                         >
                              {SAMPLE_DATA_DONUT.map((item) => {
                                   return (
                                        <div
                                             key={item.label}
                                             style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                  gap: "5px",
                                                  alignItems: "center",
                                             }}
                                        >
                                             <div
                                                  style={{
                                                       width: 16,
                                                       height: 16,
                                                       backgroundColor: item.color,
                                                  }}
                                             ></div>
                                             <span>{item.label}</span>
                                        </div>
                                   );
                              })}
                         </div>
                    </div>

                    <div className="order-stats">
                         <LineChart
                              xAxis={[
                                   {
                                        data: [
                                             "15/08",
                                             "16/08",
                                             "17/08",
                                             "18/08",
                                             "19/08",
                                             "20/08",
                                        ],
                                        scaleType: "point",
                                   },
                              ]}
                              height={200}
                              yAxis={[{ width: 50 }]}
                              series={[
                                   {
                                        curve: "linear",
                                        data: [30, 40, 20, 34, 32, 37],
                                        color: "red",
                                        label: "#VIETTEL",
                                   },

                                   {
                                        curve: "linear",
                                        data: [23, 22, 25, 28, 14, 15],
                                        color: "yellow",
                                        label: "#VNPOST",
                                   },

                                   {
                                        curve: "linear",
                                        data: [23, 30, 21, 17, 14, 12],
                                        color: "green",
                                        label: "#GRAB",
                                   },

                                   {
                                        curve: "linear",
                                        data: [13, 15, 11, 18, 22, 20],
                                        color: "blue",
                                        label: "#BE",
                                   },
                              ]}
                         />
                    </div>
               </div>
               <div className="order-list">
                    <div
                         style={{
                              fontSize: "29px",
                              marginBottom: "15px",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                         }}
                    >
                         <div>Danh sách đơn</div>
                         <select
                              style={{
                                   fontSize: "15px",
                                   backgroundColor: "black",
                                   width: "200px",
                                   border: "1px solid #ccc",
                                   paddingLeft: "15px",
                              }}
                         >
                              <option value={7}>1 giờ trước</option>
                              <option value={7}>2 ngày trước</option>
                              <option value={7}>3 ngày trước</option>
                              <option value={7}>1 ngày trước</option>
                              <option value={7}>3 ngày trước</option>
                              <option value={7}>7 ngày trước</option>
                              <option value={7}>Tùy chọn</option>
                         </select>
                    </div>
                    <div className="table-order">
                         <table>
                              <tr>
                                   <th>Mã đơn</th>
                                   <th>Người dùng</th>
                                   <th>Điểm giao</th>
                                   <th>Điểm nhận</th>
                                   <th>Drone</th>
                                   <th>Đơn vị vận chuyển</th>
                                   <th style={{ width: "10%" }}>Trọng lượng (kg)</th>
                                   <th style={{ width: "5%" }}>Kích cỡ</th>
                                   <th>Số tiền (VNĐ)</th>
                                   <th>Thời gian cập nhật</th>
                                   <th>Trạng thái</th>
                              </tr>
                              <tbody>
                                   {currentOrders.map((order) => {
                                        const status =
                                             SAMPLE_STATUS[
                                                  Math.floor(Math.random() * SAMPLE_STATUS.length)
                                             ].name;
                                        return (
                                             <tr key={order.id}>
                                                  <td
                                                       style={{
                                                            cursor: "pointer",
                                                            color: "#64c3e9",
                                                       }}
                                                  >{`#${customNanoid()}`}</td>
                                                  <td>
                                                       {
                                                            USER_SAMPLE[
                                                                 Math.floor(
                                                                      Math.random() *
                                                                           USER_SAMPLE.length
                                                                 )
                                                            ]
                                                       }
                                                  </td>
                                                  <td style={{ width: "20px" }}>
                                                       {
                                                            HUB_SAMPLE[
                                                                 Math.floor(
                                                                      Math.random() *
                                                                           HUB_SAMPLE.length
                                                                 )
                                                            ].name
                                                       }
                                                  </td>
                                                  <td>
                                                       {
                                                            HUB_SAMPLE[
                                                                 Math.floor(
                                                                      Math.random() *
                                                                           HUB_SAMPLE.length
                                                                 )
                                                            ].name
                                                       }
                                                  </td>
                                                  <td>{`QUAD_${Math.floor(
                                                       Math.random() * 20
                                                  )}`}</td>
                                                  <td>
                                                       <img
                                                            style={{
                                                                 width: "80px",
                                                                 margin: "auto",
                                                            }}
                                                            src={getRandomSupplier().url}
                                                            alt="VT LOGO"
                                                       />
                                                  </td>
                                                  <td>{(Math.random() * 5).toFixed(3)}</td>
                                                  <td>
                                                       {SIZE[Math.floor(Math.random() * 3)].name}
                                                  </td>
                                                  <td>{(Math.random() * 300).toFixed(3)}</td>
                                                  <td>
                                                       {convertTimeToDate(
                                                            Math.floor(
                                                                 (order.updated_at -
                                                                      Math.floor(
                                                                           Math.random() * 3600 * 60
                                                                      )) /
                                                                      1000
                                                            )
                                                       )}
                                                  </td>
                                                  <td
                                                       style={{
                                                            color:
                                                                 status === "Đã giao"
                                                                      ? "#1ddd1d"
                                                                      : "yellow",
                                                            fontWeight: "bold",
                                                       }}
                                                  >
                                                       {status}
                                                  </td>
                                             </tr>
                                        );
                                   })}
                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
};
