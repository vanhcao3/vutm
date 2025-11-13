import { useState } from "react";
import { createOrder, getOrderById } from "../../orders/api/orderService";
import { Order } from "../../orders/types";
import { createCommand, editCommand } from "./commandService";

export const TestScreen = () => {
     const [orderCreate, setOrderCreate] = useState<Order | null>(null);
     const [commandCreate, setCommandCreate] = useState<any>({});

     const onCreateOrder = () => {
          const order = {
               source: "65ab5cb8-a1d3-42e6-8ca0-f8169434fba7",
               dest: "d3cde25a-1e05-4349-afe0-9d18c892f4fe",
               drone_id: "02baf243-abe0-416d-9baa-6e0a7d18b703",
               gcs_id: "test2",
               flight_route: [{ latitude: 21.06084, longitude: 105.80026, altitude: 108 }],
               created_at: 1755174796000,
               updated_at: 1755225570000,
               created_by: "vxxx2",
               updated_by: "string",
               order_status: 1,
          };
          createOrder(order).then((res: any) => {
               console.log(res);
               setOrderCreate(res);
          });
     };

     const onConfirm = (step = 1) => {
          const command = {
               command_status: 2,
               command_type: 1,
               content: "deliver",
               created_at: 0,
               created_by: "vietpx",
               drone_id: "23fcc28a-320d-41a5-b6b2-0ef4b4ae8e2f",
               gcs_id: "string",
               id: "string",
               order_id: orderCreate.id,
               source: "string",
               updated_at: new Date().getTime(),
               updated_by: "user",
          };
          if (step === 1) {
               createCommand(command).then((commandRes) => {
                    setCommandCreate(commandRes);
                    getOrderById(orderCreate.id).then((res: any) => {
                         setOrderCreate(res);
                    });
               });
          } else {
               editCommand({ ...commandCreate, command_status: 2 }).then(() => {
                    getOrderById(orderCreate.id).then((res: any) => {
                         setOrderCreate(res);
                    });
               });
          }
     };

     return (
          <>
               <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>Thử nghiệm luồng đặt đơn</div>
                    <button
                         style={{ width: "100px", border: "1px solid #ccc" }}
                         onClick={onCreateOrder}
                    >
                         Tạo đơn
                    </button>
                    {orderCreate && (
                         <div style={{ color: "green" }}>{`Đã tạo đơn ${orderCreate.id}`}</div>
                    )}

                    <button
                         style={{ width: "300px", border: "1px solid #ccc" }}
                         onClick={() => onConfirm()}
                    >
                         Xác nhận lần 1 (Nạp đường bay)
                    </button>
                    {orderCreate && (
                         <div>
                              {JSON.stringify({
                                   ...orderCreate,
                                   order_status: orderCreate.order_status,
                              })}
                         </div>
                    )}
                    <button
                         style={{ width: "300px", border: "1px solid #ccc" }}
                         onClick={() => onConfirm(2)}
                    >
                         Xác nhận lần 2 (Lấy hàng)
                    </button>
                    {orderCreate && <div>{JSON.stringify(orderCreate)}</div>}
                    <button
                         style={{ width: "300px", border: "1px solid #ccc" }}
                         onClick={() => onConfirm(3)}
                    >
                         Xác nhận lần 3 (Nhận hàng)
                    </button>
                    {orderCreate && <div>{JSON.stringify(orderCreate)}</div>}
               </div>
          </>
     );
};
