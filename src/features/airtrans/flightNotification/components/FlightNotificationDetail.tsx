import {
     Box,
     Button,
     Dialog,
     DialogActions,
     DialogContent,
     DialogTitle,
     FormControl,
     Input,
     InputLabel,
     Tab,
     Tabs,
     TextField,
} from "@mui/material";
import moment from "moment";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getOneFlightNotification } from "../api/flightNotificationService";
import { FlightNotification } from "../types/FlightNotification";

interface FlightNotificationDetailInterface {
     isOpen: boolean;
     setIsOpen: Dispatch<SetStateAction<boolean>>;
     flightNotificationId: string;
}

const SAMPLE_TS = 1762061371319; // 02/11/2025

interface TabPanelProps {
     children?: React.ReactNode;
     index: number;
     value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
     const { children, value, index, ...other } = props;
     return (
          <div
               role="tabpanel"
               hidden={value !== index}
               id={`simple-tabpanel-${index}`}
               aria-labelledby={`simple-tab-${index}`}
          >
               {value === index && <Box>{children}</Box>}
          </div>
     );
};

const a11yProps = (index: number) => {
     return {
          id: `simple-tab-${index}`,
          "aria-controls": `simple-tabpanel-${index}`,
     };
};

export const FlightNotificationDetail = (props: FlightNotificationDetailInterface) => {
     const [currentTab, setCurrentTab] = useState<number>(0);

     const [flightNotification, setFlightNotification] = useState<FlightNotification>(undefined);

     useEffect(() => {
          getOneFlightNotification(props.flightNotificationId)
               .then((res) => {
                    console.log(res);

                    setFlightNotification(res);
               })
               .catch((err) => {
                    console.error(err);
               });
     }, [props.flightNotificationId]);

     const handleClose = () => {
          props.setIsOpen(false);
     };

     const handleChangeTab = (e: React.SyntheticEvent, newValue: number) => {
          setCurrentTab(newValue);
     };

     return (
          <>
               <Dialog open={props.isOpen} maxWidth={false}>
                    <DialogTitle>Chi tiết phép bay</DialogTitle>
                    <DialogContent>
                         <Box sx={{ width: "100%" }} noValidate component="form">
                              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                   <Tabs
                                        value={currentTab}
                                        onChange={handleChangeTab}
                                        aria-label="basic tabs sample"
                                   >
                                        <Tab
                                             label="Thông tin cá nhân (tổ chức)"
                                             {...a11yProps(0)}
                                        />
                                        <Tab label="Khu vực bay" {...a11yProps(1)} />
                                   </Tabs>
                              </Box>
                              <CustomTabPanel value={currentTab} index={0}>
                                   <Box component="form" sx={{ "& > :not(style)": { m: 5 } }}>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="business_name">
                                                  Tên cá nhân (tổ chức)
                                             </InputLabel>
                                             <Input
                                                  id="business_name"
                                                  value={
                                                       flightNotification
                                                            ?.flight_authorization_approval
                                                            ?.flight_authorization_proposal
                                                            ?.operator?.business_name
                                                  }
                                                  defaultValue={""}
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="factory_number">
                                                  Mã drone
                                             </InputLabel>
                                             <Input
                                                  id="factory_number"
                                                  value={
                                                       flightNotification
                                                            ?.flight_authorization_approval
                                                            ?.flight_authorization_proposal?.drones
                                                            ?.length &&
                                                       flightNotification
                                                            ?.flight_authorization_approval
                                                            ?.flight_authorization_proposal
                                                            ?.drones[0].drone_registration
                                                            ?.factory_number
                                                  }
                                                  defaultValue={""}
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="registration_number">
                                                  Mã đăng ký drone
                                             </InputLabel>
                                             <Input
                                                  id="registration_number"
                                                  value={
                                                       flightNotification
                                                            ?.flight_authorization_approval
                                                            ?.flight_authorization_proposal?.drones
                                                            ?.length &&
                                                       flightNotification
                                                            ?.flight_authorization_approval
                                                            ?.flight_authorization_proposal
                                                            ?.drones[0].drone_registration
                                                            ?.registration_number
                                                  }
                                                  defaultValue={""}
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="intended_flight_area">
                                                  Số khu vực bay
                                             </InputLabel>
                                             <Input
                                                  id="intended_flight_area"
                                                  value={
                                                       flightNotification?.intended_flight_area
                                                            ?.length
                                                  }
                                                  defaultValue={""}
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="from_day">
                                                  Ngày bắt đầu
                                             </InputLabel>
                                             <Input
                                                  id="from_day"
                                                  value={moment(
                                                       flightNotification
                                                            ?.intended_operating_duration?.from_day
                                                  ).format("YYYY-MM-DD HH:mm:ss")}
                                                  defaultValue={""}
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="to_day">Ngày kết thúc</InputLabel>
                                             <Input
                                                  id="to_day"
                                                  value={moment(
                                                       flightNotification
                                                            ?.intended_operating_duration?.to_day
                                                  ).format("YYYY-MM-DD HH:mm:ss")}
                                                  defaultValue={""}
                                                  disabled
                                             />
                                        </FormControl>
                                   </Box>
                              </CustomTabPanel>

                              <CustomTabPanel value={currentTab} index={1}>
                                   {flightNotification?.flight_authorization_approval?.flight_authorization_proposal?.flight_area?.map(
                                        (row) => {
                                             return (
                                                  <Box
                                                       key={row.id}
                                                       component="form"
                                                       sx={{ "& > :not(style)": { m: 5 } }}
                                                  >
                                                       <FormControl variant="standard">
                                                            <InputLabel htmlFor="place">
                                                                 Vị trí
                                                            </InputLabel>
                                                            <Input
                                                                 id="place"
                                                                 value={row.place}
                                                                 defaultValue={""}
                                                                 disabled
                                                            />
                                                       </FormControl>

                                                       <FormControl variant="standard">
                                                            <InputLabel htmlFor="province">
                                                                 Tỉnh (Thành phố)
                                                            </InputLabel>
                                                            <Input
                                                                 id="province"
                                                                 value={row.province}
                                                                 defaultValue={""}
                                                                 disabled
                                                            />
                                                       </FormControl>

                                                       <FormControl variant="standard">
                                                            <InputLabel htmlFor="commune">
                                                                 Xã
                                                            </InputLabel>
                                                            <Input
                                                                 id="commune"
                                                                 value={row.commune}
                                                                 defaultValue={""}
                                                                 disabled
                                                            />
                                                       </FormControl>

                                                       <FormControl variant="standard">
                                                            <InputLabel htmlFor="coordinates">
                                                                 Tọa độ
                                                            </InputLabel>
                                                            <Input
                                                                 id="coordinates"
                                                                 value={`[${row.polygon
                                                                      ?.map(
                                                                           (item) =>
                                                                                `[${item.longitude}, ${item.latitude}]`
                                                                      )
                                                                      .join(", ")}]`}
                                                                 defaultValue={""}
                                                                 disabled
                                                            />
                                                       </FormControl>
                                                  </Box>
                                             );
                                        }
                                   )}
                              </CustomTabPanel>
                         </Box>
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleClose}>Đóng</Button>
                    </DialogActions>
               </Dialog>
          </>
     );
};
