/* eslint-disable no-restricted-imports */
import { Suspense, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { Spinner } from "@/components/Elements";
import { TDLayout, SDLayout } from "@/components/Layout";
import { Map2D } from "@/features/sd/map2d";
import { lazyImport } from "@/utils/lazyImport";

const { Counter } = lazyImport(() => import("@/features/td/counter"), "Counter");
const { DemoComponent } = lazyImport(
     () => import("@/features/td/uicomponent_demo"),
     "DemoComponent"
);
const { Dashboard } = lazyImport(() => import("@/features/td/mui_dashboard"), "Dashboard");
const { DataGridDemo } = lazyImport(() => import("@/features/td/table_demo"), "DataGridDemo");
const { TrackTable } = lazyImport(() => import("@/features/td/tracks"), "TrackTable");
const { InformationManagement } = lazyImport(
     () => import("@/features/td/information_management"),
     "InformationManagement"
);
const { OrderList } = lazyImport(
     () => import("@/features/airtrans/orders/components/OrderList"),
     "OrderList"
);
const { DroneList } = lazyImport(
     () => import("@/features/airtrans/drones/components/DroneList"),
     "DroneList"
);

const { DroneListManagement } = lazyImport(
     () => import("@/features/airtrans/droneList/components/DroneListManagement"),
     "DroneListManagement"
);
const { HubManagement } = lazyImport(
     () => import("@/features/airtrans/hub/components/HubManagement"),
     "HubManagement"
);
// const { HubManagement } = lazyImport(
//      () => import("@/features/airtrans/locker/components/HubManagement',)

// );

const { PrivilegePage } = lazyImport(() => import("@/features/td/privileges"), "PrivilegePage");
const { SupplierListManagement } = lazyImport(
     () => import("@/features/airtrans/supplier/components/SupplierListManagement"),
     "SupplierListManagement"
);

const { TestScreen } = lazyImport(
     () => import("@/features/airtrans/test/component/TestScreen"),
     "TestScreen"
);

const { DirectCommandManagement } = lazyImport(
     () => import("@/features/airtrans/directCommand/components/DirectCommandManagement"),
     "DirectCommandManagement"
);

const { ReceiveCommandManagement } = lazyImport(
     () => import("@/features/airtrans/receiveCommand/components/ReceiveCommandManagement"),
     "ReceiveCommandManagement"
);

const { FlightCorridorManagement } = lazyImport(
     () => import("@/features/airtrans/flightCorridor/components/FlightCorridorManagement"),
     "FlightCorridorManagement"
);

const { FlightLaneManagement } = lazyImport(
     () => import("@/features/airtrans/flightCorridor/components/FlightLaneManagement"),
     "FlightLaneManagement"
);

const { FlightAuthorization } = lazyImport(
     () => import("@/features/airtrans/flightAuthorization/components/FlightAuthorization"),
     "FlightAuthorization"
);

import CallIcon from "@mui/icons-material/Call";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FlightNotifications } from "@/features/airtrans/flightNotification/components/FlightNotifications";

const { PrivateRoute } = lazyImport(() => import("@/lib/private-route"), "PrivateRoute");

const App = () => {
     // useEffect(() => {
     //      setInterval(keepLogin, 55000);
     // }, []);

     return (
          <SDLayout title="SD">
               <Suspense
                    fallback={
                         <div className="h-full w-full flex items-center justify-center">
                              <Spinner size="xl" />
                         </div>
                    }
               >
                    <Outlet />
               </Suspense>
          </SDLayout>
     );
};

const Map2DApp = () => {
     const headerProps = {
          menuItem: [
               {
                    label: "Profile",
                    value: "Profile",
               },
               {
                    label: "My Account",
                    value: "My Account",
               },
               {
                    label: "Logout",
                    value: "Logout",
               },
          ],
          listButtonRight: [
               {
                    icon_code: "icon-16",
                    label: "default",
                    value: "default",
               },
               {
                    icon_code: "icon-17",
                    label: "heatmap",
                    value: "heatmap",
               },
               {
                    icon_code: "icon-18",
                    label: "satelite",
                    value: "satelite",
               },
               {
                    icon_code: "icon-18",
                    label: "topo",
                    value: "topo",
               },
               {
                    icon_code: "icon-3",
                    label: "3d",
                    value: "3d",
               },
          ],
          listButtonLeft: [
               {
                    icon_code: "icon-toolbar-19",
                    label: "zoomIn",
                    value: "zoomIn",
               },
               {
                    icon_code: "icon-toolbar-18",
                    label: "zoomOut",
                    value: "zoomOut",
               },
               {
                    icon_code: "icon-toolbar-15",
                    label: "dragPan",
                    value: "dragPan",
               },
          ],
     };
     return (
          <>
               <Map2D />
          </>
     );
};
const TD = () => {
     // const usePrivilege = usePrivileges();

     // useEffect(() => {
     //      setInterval(keepLogin, 55000);
     // }, []);

     const drawerProps = {
          width: "15%",
          items: [
               {
                    label: "Dashboard",
                    icon_name: "icon-8",
                    route: "muidashboard",
                    id: "muidashboard",
               },
               {
                    label: "Counter",
                    icon_name: "icon-6",
                    route: "counter",
                    id: "counter",
               },
               {
                    label: "Profile",
                    icon_name: "icon-7",
                    route: "profile",
               },
               {
                    label: "Drafts",
                    icon_name: "icon-9",
                    route: "datagriddemo",
               },
               {
                    label: "Tracks",
                    icon_name: "icon-5",
                    route: "tracks",
               },
          ],
     };
     const appBarProps = {
          title: "FRONTEND TEMPLATE",
          menuItem: [
               {
                    label: "Profile",
                    value: "Profile",
               },
               {
                    label: "My Account",
                    value: "My Account",
               },
               {
                    label: "Logout",
                    value: "Logout",
               },
          ],
          listButton: [
               {
                    icon: <CallIcon />,
                    label: "call",
                    value: "call",
               },
               {
                    icon: <TelegramIcon />,
                    label: "telegram",
                    value: "telegram",
               },
               {
                    icon: <TwitterIcon />,
                    label: "twitter",
                    value: "twitter",
               },
          ],
     };
     return (
          <TDLayout drawerProps={drawerProps} appBarProps={appBarProps}>
               <Suspense
                    fallback={
                         <div className="h-full w-full flex items-center justify-center">
                              <Spinner size="xl" />
                         </div>
                    }
               >
                    <Outlet />
               </Suspense>
          </TDLayout>
     );
};
export const protectedRoutes = [
     {
          path: "/",
          element: (
               <PrivateRoute>
                    <App />
               </PrivateRoute>
          ),
          children: [
               // { path: "/sd/map3d", element: <Map3D /> },
               // { path: "/", element: <Map2DApp /> },
               { path: "*", element: <Navigate to="." /> },
          ],
     },
     {
          path: "/td",
          element: (
               <PrivateRoute>
                    <TD />
               </PrivateRoute>
          ),
          children: [
               { path: "/td/counter", element: <Counter /> },
               { path: "/td/demo", element: <DemoComponent /> },
               { path: "/td/muidashboard", element: <Dashboard /> },
               { path: "/td/datagriddemo", element: <DataGridDemo /> },
               { path: "/td/tracks", element: <TrackTable /> },
               { path: "/td/drones", element: <DroneListManagement /> },
               { path: "/td/lockers", element: <HubManagement /> },
               { path: "/td/test-screen", element: <TestScreen /> },
               // { path: "/td/", element: <Dashboard /> },
               { path: "/td/", element: <OrderList /> },
               { path: "/td/gcs", element: <SupplierListManagement /> },
               { path: "/td/drone-route", element: <DroneList /> },
               { path: "/td/direct-command", element: <DirectCommandManagement /> },
               { path: "/td/receive-command", element: <ReceiveCommandManagement /> },
               { path: "*", element: <Navigate to="." /> },
               {
                    path: "/td/quan-ly-thong-tin/ql-danh-muc-du-lieu",
                    element: <InformationManagement />,
               },
               { path: "/td/privileges", element: <PrivilegePage /> },
               { path: "/td/flight-corridor", element: <FlightCorridorManagement /> },
               { path: "/td/flight-lane", element: <FlightLaneManagement /> },
               { path: "/td/flight-authorization", element: <FlightAuthorization /> },

               { path: "/td/flight-notification", element: <FlightNotifications /> },
          ],
     },
];
