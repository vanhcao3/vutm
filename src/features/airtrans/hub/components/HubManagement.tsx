import { customAlphabet, nanoid } from "nanoid";
import VietnamPostLogo from "@/assets/Vietnam_post_logo.png";
import ViettelLogo from "@/assets/images/logoViettel.png";
import BeLogo from "@/assets/be_logo.jpeg";
import GrabLogo from "@/assets/grab_logo.png";
import Map, { Layer, MapRef, Source } from "react-map-gl";
import * as turf from "@turf/turf";
import "../styles/hubStyle.scss";
import { MAPBOX_TOKEN } from "@/config/constantConfigs";
import { useRef } from "react";

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

const hubList = [
     { address: "Tòa nhà Viettel High Tech Hòa Lạc" },
     { address: "Kho M1" },
     { address: "Kho M3" },
     { address: "Tòa nhà Viettel High Tech 380LLQ" },
];

const hub2 = [105.50222284462126, 20.696634750505083];
const hub3 = [105.27573605627549, 20.998065314520446];
const startPoint = [105.65275109628772, 21.20318063583281];
const lastPoint = [106.0607876697209, 20.81522756877555];
const mapBounds = {
     _sw: {
          lng: 105.50197489760234,
          lat: 20.742796682379122,
     },
     _ne: {
          lng: 106.34534597560759,
          lat: 21.253116333812343,
     },
};

export const HubManagement = () => {
     const mapRef = useRef<MapRef>(null);

     return (
          <>
               <div
                    style={{
                         width: "100%",
                         display: "flex",
                         flexDirection: "row",
                         gap: "20px",
                         height: "100%",
                    }}
               >
                    <div style={{ width: "50%" }}>
                         <div style={{ fontSize: "37px", marginBottom: "18px" }}>Danh sách Hub</div>
                         <div className="supplier-list-table">
                              <table>
                                   <tr>
                                        <th style={{ width: "10%" }}>ID</th>
                                        <th>Địa chỉ</th>
                                        <th>Mô tả</th>
                                        <th style={{ width: "10%" }}>Số lượng ngăn</th>
                                   </tr>

                                   <tbody>
                                        {hubList.map((hub) => {
                                             return (
                                                  <tr key={nanoid()}>
                                                       <td>{customNanoid()}</td>
                                                       <td>{hub.address}</td>
                                                       <td></td>
                                                       <td>{Math.floor(Math.random() * 20)}</td>
                                                  </tr>
                                             );
                                        })}
                                   </tbody>
                              </table>
                         </div>
                    </div>
                    <div style={{ width: "50%", height: "100%" }}>
                         <Map
                              ref={mapRef}
                              initialViewState={{
                                   bounds: [
                                        mapBounds._ne.lng,
                                        mapBounds._ne.lat,
                                        mapBounds._sw.lng,
                                        mapBounds._sw.lat,
                                   ],
                              }}
                              style={{ width: "100%", height: "100%" }}
                              mapboxAccessToken={MAPBOX_TOKEN}
                              mapStyle={
                                   "http://airtransys.site/ms-tile-server/styles/hanhchinh_xa/style.json"
                              }
                         >
                              <Source
                                   type="geojson"
                                   data={turf.featureCollection([
                                        turf.point(startPoint, { hub_name: "HUB_1" }),
                                        turf.point(lastPoint, { hub_name: "HUB_2" }),
                                        turf.point(hub2, { hub_name: "HUB_3" }),
                                        turf.point(hub3, { hub_name: "HUB_4" }),
                                   ])}
                              >
                                   <Layer
                                        type="circle"
                                        paint={{ "circle-radius": 5, "circle-color": "red" }}
                                   />

                                   <Layer
                                        type="symbol"
                                        layout={{
                                             "text-field": ["get", "hub_name"],
                                             "text-size": 15,
                                             "text-offset": [0, 0],
                                             "text-variable-anchor": ["top"],
                                        }}
                                   />
                              </Source>
                         </Map>
                    </div>
               </div>
          </>
     );
};
