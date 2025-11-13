import { useEffect, useRef } from "react";
import "../styles/droneStyle.scss";
import Map, { MapRef } from "react-map-gl";
import droneIconSrc from "@/assets/drone_icon.png";
import { DroneLayer } from "./DroneLayer";
import { MAPBOX_TOKEN } from "@/config/constantConfigs";
import { DroneInfo } from "./DroneInfo";
import { Toolbar } from "./Toolbar";
import { FilterTool } from "./FilterTool";
import { getAllHubs } from "../../hub/api/lockerService";
import { useDispatch, useSelector } from "react-redux";
import { setHubList, setHubs } from "@/slices/sd/hubSlice";
import { convertArrayToObject } from "@/utils/convert";
import { MenuForm } from "../../menuForm";
import { getAllDrones } from "../api/droneService";
import { setDrones } from "@/slices/sd/droneSlice";
import { setDataSourceList } from "@/slices/td/dataSourceSlice";
import { HubLayer } from "../../hub/components/HubLayer";
import { FlightCorridorLayer } from "../../flightCorridor/components/FlightCorridorLayer";
import {
     getAllFlightCorridors,
     getAllFlightLanes,
} from "../../flightCorridor/service/flightCorridorService";
import { setFlightCorridorList, setFlightCorridors } from "@/slices/sd/flightCorridorSlice";
import { setFlightLaneList, setFlightLanes } from "@/slices/sd/flightLaneSlice";
import { FlightLaneLayer } from "../../flightCorridor/components/FlightLaneLayer";
import { AllowFlyLayer } from "./AllowFlyLayer";
import { NoFlightLayer } from "./NoFlightLayer";
import { DataSourceLayer } from "../../dataSource/components/DataSourceLayer";
import { RootState } from "@/slices";
// eslint-disable-next-line no-restricted-imports
import { getAllDataSource } from "@/features/airtrans/dataSource/api/dataSourceService";
import { FlightLayer } from "../../flightDataCrawler/components/FlightLayer";
import { toast } from "react-toastify";

const droneIcon = new Image();
droneIcon.src = droneIconSrc;

const mapBounds = {
     _sw: {
          lng: 105.5129023844056,
          lat: 20.994374621605857,
     },
     _ne: {
          lng: 105.57059039134248,
          lat: 21.024332378140343,
     },
};

export const DroneList = () => {
     const mapRef = useRef<MapRef>(null);
     const dispatch = useDispatch();
     const selectedTrackId = useSelector((state: RootState) => state.track.selected_id);
     const getListDrone = () => {
          getAllDrones().then((res) => {
               dispatch(setDrones(convertArrayToObject(res)));
          });
     };
     const getListFlightCorridors = () => {
          getAllFlightCorridors().then((res) => {
               dispatch(setFlightCorridorList(res));
               dispatch(setFlightCorridors(convertArrayToObject(res)));
          });
     };
     const getListFlightLanes = () => {
          getAllFlightLanes().then((res) => {
               dispatch(setFlightLaneList(res));
               dispatch(setFlightLanes(convertArrayToObject(res)));
          });
     };
     const getListDirectCommands = () => {};
     const getListHubs = () => {
          getAllHubs().then((res) => {
               dispatch(setHubList(res));
               const hubRecord = convertArrayToObject(res);
               dispatch(setHubs(hubRecord));
          });
     };
     const selectedMap = useSelector((state: RootState) => state.uiControl.selectedMap);

     useEffect(() => {
          getListHubs();
          getListDrone();
          getListDirectCommands();
          getListFlightCorridors();
          getListFlightLanes();
          getAllDataSource().then((res) => {
               dispatch(setDataSourceList(res));
          });

          console.log("init web socket");
          const socket = new WebSocket("wss://airtransys.site:9443/air-conflict/ws/alerts");
          socket.onmessage = (event) => {
               toast.warn("Phát hiện khả năng va chạm trong 10 giây nữa");
          };
          socket.onopen = () => {
               console.log("connected");
          };

          return () => {
               socket.close();
          };
     }, []);

     return (
          <>
               {selectedTrackId > 0 && <DroneInfo />}
               <Toolbar />
               <MenuForm />
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
                    cursor={"default"}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    mapStyle={selectedMap.url}
               >
                    <FlightCorridorLayer />
                    <FlightLaneLayer />

                    <DataSourceLayer />

                    <HubLayer />
                    <DroneLayer />
                    <AllowFlyLayer />
                    <NoFlightLayer />
                    <FlightLayer />
               </Map>
          </>
     );
};
