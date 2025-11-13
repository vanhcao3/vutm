/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import TDAppBar from "../AppBar/AppBar";
import TDDrawer from "../Drawer/Drawer";
import { useSelector } from "react-redux";
import { DrawerItem, Privilege } from "@/types";
import "./sidebar.scss";
import { useNavigate } from "react-router-dom";
import { convertTimeToDate } from "@/utils/convert";
import { AccountCircle } from "@mui/icons-material";
import { useAuth } from "@/lib/auth";

type TDLayoutProps = {
     children: React.ReactNode;
     appBarProps: {
          title: string;
          menuItem: {
               label: string;
               value: string;
          }[];
          listButton: {
               icon: any;
               label: string;
               value: string;
          }[];
     };
     drawerProps: {
          width: string;
          items: {
               label: string;
               icon_name: string;
               route?: string;
               id?: string | null;
          }[];
     };
};

const backOption = {
     label: "Quay lại",
     icon_name: "back",
     route: "/",
     id: null,
};

const searchChildPrivileges = (parentId: string, privilegeList: Array<Privilege>) => {
     const childPrivileges: Array<Privilege> = privilegeList.filter(
          (item: Privilege) => item.parent_id === parentId
     );
     return childPrivileges;
};

const searchParentPrivileges = (childId: string, privilegeList: Array<Privilege>) => {
     const childPrivilege = privilegeList.find((item: Privilege) => item.id === childId);
     if (childPrivilege)
          return privilegeList.find((item: Privilege) => item.id === childPrivilege.parent_id);
     return undefined;
};

const getIconName = (iconFullName: string) => {
     return iconFullName ? iconFullName.split(".")[0] : "";
};

const MonitorSidebarItems = [
     { name: "Phương tiện bay", route: "/td/drones" },
     // { name: "Hành lang bay", route: "/td/flight-corridor" },
     // { name: "Làn bay", route: "/td/flight-lane" },
     { name: "Màn hình giám sát", route: "/td/drone-route" },
     { name: "Nhà cung cấp", route: "/td/gcs" },
     { name: "Chỉ thị", route: "/td/direct-command" },
     { name: "Phép bay", route: "/td/flight-authorization" },
     { name: "Thông báo bay", route: "/td/flight-notification" },
     // { name: "Hành lang bay", route: "/td/flight-offset" },

     // { name: "Danh sách yêu cầu", route: "/commands" },
];

const SidebarItems = [
     { name: "Quản lý đơn", route: "/td/orders" },
     { name: "Drone", route: "/td/drones" },
     { name: "Màn hình giám sát", route: "/td/drone-route" },
     { name: "Nhà cung cấp", route: "/td/gcs" },
     { name: "Điểm giao/nhận", route: "/td/hubs" },
     { name: "Chỉ thị nhận", route: "/td/receive-command" },
     { name: "Phép bay", route: "/td/flight-authorization" },
     { name: "Thông báo bay", route: "/td/flight-notification" },
     // { name: "Danh sách yêu cầu", route: "/commands" },
];

export const TDLayout = ({ children, drawerProps, appBarProps }: TDLayoutProps) => {
     const [currentDrawer, setCurrentDrawer] = useState<Array<DrawerItem>>([]);
     const { selectedItem, privileges } = useSelector((state: any) => state.drawer);
     const navigate = useNavigate();
     const { user, logout } = useAuth();
     const [openProfile, setOpenProfile] = useState(false);
     const profileAnchorRef = React.useRef<HTMLDivElement | null>(null);

     const stringToColor = (name: string) => {
          let hash = 0;
          for (let i = 0; i < name.length; i += 1) {
               hash = name.charCodeAt(i) + ((hash << 5) - hash);
          }
          let color = "#";
          for (let i = 0; i < 3; i += 1) {
               const value = (hash >> (i * 8)) & 0xff;
               color += `00${value.toString(16)}`.slice(-2);
          }
          return color;
     };

     const getInitial = (text?: string) => {
          if (!text || text.length === 0) return "?";
          return text.trim().charAt(0).toUpperCase();
     };

     useEffect(() => {
          const childPrivilege = searchChildPrivileges(selectedItem, privileges);
          if (childPrivilege.length <= 0) return;
          const newDrawer: DrawerItem[] = [];
          childPrivilege.forEach((priv: Privilege) => {
               newDrawer.push({
                    label: priv.name,
                    icon_name: `icon-${getIconName(priv.icon)}`,
                    route: priv.path,
                    id: priv.id,
               });
          });
          if (selectedItem === null) setCurrentDrawer(newDrawer);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          else setCurrentDrawer([backOption, ...newDrawer]);
     }, [selectedItem, privileges]);

     const handleClickSidebarItem = (path: string) => {
          navigate(`/td${path}`);
     };

     return (
          <Box sx={{ flexGrow: 1, height: "100%" }}>
               <AppBar position="static">
                    <Toolbar>
                         <Typography
                              variant="h6"
                              noWrap
                              component={"a"}
                              sx={{
                                   fontFamily: "monospace",
                                   letterSpacing: ".3rem",
                                   fontSize: 35,
                                   fontWeight: 700,
                                   flexGrow: 1,
                              }}
                         >
                              VUTM
                         </Typography>
                         <IconButton sx={{ mr: "20px" }}>
                              <AccountCircle />
                         </IconButton>
                         <Typography>
                              {convertTimeToDate(Math.floor(new Date().getTime() / 1000))}
                         </Typography>
                    </Toolbar>
               </AppBar>
               <Box
                    component={"main"}
                    sx={{
                         flexGrow: 1,
                         height: "calc(100vh - 64px)",
                         display: "flex",
                         flexDirection: "row",
                    }}
               >
                    <Box sx={{ height: "100%", width: "250px", backgroundColor: "#121212" }}>
                         {MonitorSidebarItems.map((item, index) => {
                              return (
                                   <Box
                                        key={`sidebar_item_${index}`}
                                        sx={{
                                             minWidth: "50px",
                                             cursor: "pointer",
                                             padding: "12px 20px",
                                             fontSize: "16px",
                                             transition: "all 0.3s ease",
                                             "&:hover": {
                                                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                  paddingLeft: "24px",
                                                  borderLeft: "4px solid #1abc9c",
                                                  color: "#1abc9c",
                                             },
                                        }}
                                        onClick={() => navigate(item.route)}
                                   >
                                        {item.name}
                                   </Box>
                              );
                         })}
                    </Box>
                    <Box sx={{ flexGrow: 1, width: "calc(100vw - 250px)" }}>{children}</Box>
               </Box>
          </Box>
     );
};
