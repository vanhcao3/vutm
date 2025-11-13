import { useEffect, useState } from "react";
import { Order, Segment, SEGMENT_TYPE, SegmentStatus } from "../../orders/types";
import { getAllOrders } from "../../orders/api/orderService";
import { getFlightLaneDetail } from "../../flightCorridor/service/flightCorridorService";
import { FlightLane } from "../../flightCorridor/types";
import { useSelector } from "react-redux";
import { RootState } from "@/slices";
import { convertHubListToRecords } from "../../hub/utils/convert";
import "./statisticStyle.scss";
import { filterDroneCommand } from "../../directCommand/api/directCommandService";
import { CommandStatus } from "../../directCommand/types";
import moment from "moment";

interface SegmentFullDetail extends Segment {
     lane_detail: FlightLane;
     order_created_time: number;
     segment_start_time?: number;
}

const getHhMmFromTS = (ts: number) => {
     const date = new Date(ts);
     return `${date.getHours().toString().padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;
};

const getTimeSegment = (createdOrderTime: number, segmentInfo: SegmentFullDetail) => {
     const { lane_detail } = segmentInfo;
     const { position } = lane_detail;
     const startWaypoint = position[0];
     const finishWaypoint = position[position.length - 1];
     const startETA = startWaypoint.eta;
     const finishETA = finishWaypoint.eta;
     const startTime = createdOrderTime + startETA * 1000;
     const finishTime = createdOrderTime + finishETA * 1000;

     return {
          startTime,
          finishTime,
          formatedStart: moment(startTime).format("HH:mm"),
          formatedFinish: moment(finishTime).format("HH:mm"),
     };
};

export const getSegmentStatus = (segmentStatus: SegmentStatus) => {
     switch (segmentStatus) {
          case SegmentStatus.UNKNOWN:
               return "KXĐ";
          case SegmentStatus.UNFINISHED:
               return "Chuẩn bị";
          case SegmentStatus.FINISHED:
               return "Hoàn thành";
          default:
               return "";
     }
};

export const getSegmentType = (segmentType: SEGMENT_TYPE) => {
     switch (segmentType) {
          case SEGMENT_TYPE.UNKNOWN:
               return "KXĐ";
          case SEGMENT_TYPE.IN_DELIVERY:
               return "Vận chuyển";
          case SEGMENT_TYPE.PRE_DELIVERY:
               return "Lấy hàng";
          case SEGMENT_TYPE.RETURN_ROUTE:
               return "Khứ hồi";
          default:
               return "";
     }
};

export const StatisticPanel = () => {
     const [segmentList, setSegmentList] = useState<SegmentFullDetail[]>([]);
     const hubList = useSelector((state: RootState) => state.hub.hub_list);
     const allHubRecords = convertHubListToRecords(hubList);

     const generateData = () => {
          setSegmentList([]);
          getAllOrders().then((res) => {
               res.filter((currentOrder) => currentOrder.segments).forEach((currentOrder) => {
                    currentOrder.segments
                         .filter(
                              (segmentInfo) => segmentInfo.segment_status !== SegmentStatus.FINISHED
                         )
                         .forEach((segmentInfo) => {
                              const { flight_lane_id } = segmentInfo;
                              getFlightLaneDetail(flight_lane_id).then((laneDetail) => {
                                   let segmentDetail: SegmentFullDetail = {
                                        ...segmentInfo,
                                        lane_detail: laneDetail,
                                        order_created_time: laneDetail.created_at,
                                   };
                                   filterDroneCommand(
                                        segmentInfo.segment_index,
                                        currentOrder.id
                                   ).then((droneCommandList) => {
                                        if (
                                             droneCommandList.length === 1 &&
                                             droneCommandList[0].command_status ===
                                                  CommandStatus.ACK &&
                                             droneCommandList[0].updated_at !==
                                                  droneCommandList[0].created_at
                                        ) {
                                             console.log("found the updated at");
                                             segmentDetail = {
                                                  ...segmentDetail,
                                                  segment_start_time:
                                                       droneCommandList[0].updated_at,
                                             };
                                        }
                                        setSegmentList((prev) => [...prev, segmentDetail]);
                                   });
                              });
                         });
               });
          });
     };

     useEffect(() => {
          generateData();
          const orderInterval = setInterval(() => {
               generateData();
          }, 5000);

          return () => {
               clearInterval(orderInterval);
               setSegmentList([]);
          };
     }, []);

     return (
          <>
               <div className="statistic-style">
                    <div>Danh sách chuyến bay</div>
                    <table>
                         <tr>
                              <th style={{ width: "5%" }}>#</th>
                              <th>Drone ID</th>
                              <th>Điểm đi</th>
                              <th>Điểm đến</th>
                              <th>Trạng thái</th>
                              <th>Loại chuyến</th>
                              <th style={{ width: "10%" }}>Dự kiến xuất phát</th>
                              <th style={{ width: "10%" }}>Dự kiến hạ cánh</th>
                              <th style={{ width: "10%" }}>Xuất phát</th>
                              <th>Thời gian bay (dự kiến)</th>
                         </tr>

                         <tbody>
                              {segmentList
                                   .sort((a, b) => a.segment_index - b.segment_index)
                                   .map((segmentInfo, index) => {
                                        return (
                                             <tr key={`segment_full_${index}`}>
                                                  {/* <td>{segmentInfo.segment_index}</td> */}
                                                  <td>{index + 1}</td>
                                                  <td>{segmentInfo.drone_id}</td>
                                                  <td>{allHubRecords[segmentInfo.source].name}</td>
                                                  <td>{allHubRecords[segmentInfo.dest].name}</td>
                                                  <td>
                                                       {segmentInfo.segment_start_time
                                                            ? segmentInfo.segment_start_time -
                                                                   getTimeSegment(
                                                                        segmentInfo.order_created_time,
                                                                        segmentInfo
                                                                   ).startTime >=
                                                              30 * 1000
                                                                 ? "Trễ"
                                                                 : "Đúng giờ"
                                                            : "Chưa bắt đầu"}
                                                  </td>
                                                  <td>
                                                       {getSegmentType(segmentInfo.segment_type)}
                                                  </td>
                                                  <td
                                                       style={{
                                                            color: `${
                                                                 segmentInfo.lane_detail
                                                                      .delay_time > 0
                                                                      ? "red"
                                                                      : "inherit"
                                                            }`,
                                                       }}
                                                  >
                                                       {segmentInfo.lane_detail.delay_time > 0
                                                            ? moment(
                                                                   segmentInfo.lane_detail
                                                                        .delay_time
                                                              ).format("HH:mm")
                                                            : `${
                                                                   getTimeSegment(
                                                                        segmentInfo.order_created_time,
                                                                        segmentInfo
                                                                   ).formatedStart
                                                              }`}
                                                  </td>
                                                  <td>
                                                       {
                                                            getTimeSegment(
                                                                 segmentInfo.order_created_time,
                                                                 segmentInfo
                                                            ).formatedFinish
                                                       }
                                                  </td>
                                                  <td>
                                                       {segmentInfo.segment_start_time
                                                            ? getHhMmFromTS(
                                                                   segmentInfo.segment_start_time
                                                              )
                                                            : ""}
                                                  </td>
                                                  <td>
                                                       {`${Math.floor(
                                                            (getTimeSegment(
                                                                 segmentInfo.order_created_time,
                                                                 segmentInfo
                                                            ).finishTime -
                                                                 getTimeSegment(
                                                                      segmentInfo.order_created_time,
                                                                      segmentInfo
                                                                 ).startTime) /
                                                                 1000 /
                                                                 60
                                                       )} phút`}
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
