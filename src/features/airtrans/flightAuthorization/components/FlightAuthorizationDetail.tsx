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
import { getFlightApprovalById } from "../api/flightAuthorizationService";

interface FlightAuthorizationDetailInterface {
     isOpen: boolean;
     setIsOpen: Dispatch<SetStateAction<boolean>>;
     flightApprovalId: string;
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

export const FlightAuthorizationDetail = (props: FlightAuthorizationDetailInterface) => {
     const { isOpen, setIsOpen, flightApprovalId } = props;
     const [currentTab, setCurrentTab] = useState<number>(0);
     const [flightDetail, setFlightDetail] = useState<any>({});

     useEffect(() => {
          getFlightApprovalById(flightApprovalId).then((res) => {
               console.log("flight approval detail", res);
               setFlightDetail(res);
          });
     }, [flightApprovalId]);

     const handleClose = () => {
          console.log("close");
          setIsOpen(false);
     };

     const handleChangeTab = (e: React.SyntheticEvent, newValue: number) => {
          setCurrentTab(newValue);
     };

     if (!flightDetail.id) return <></>;

     return (
          <>
               <Dialog open={isOpen} maxWidth={false}>
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
                                        <Tab
                                             label="Chứng nhận đăng ký phương tiện"
                                             {...a11yProps(1)}
                                        />
                                        <Tab label="Thông số kỹ thuật" {...a11yProps(2)} />
                                        <Tab label="Mục đích bay" {...a11yProps(3)} />
                                        <Tab label="Khu vực bay" {...a11yProps(4)} />
                                        <Tab label="Thời gian bay" {...a11yProps(5)} />
                                        <Tab label="Sân bay" {...a11yProps(6)} />
                                        <Tab label="Người điều khiển" {...a11yProps(7)} />
                                   </Tabs>
                              </Box>
                              <CustomTabPanel value={currentTab} index={0}>
                                   <Box component="span" sx={{ color: "#27ff43" }}>
                                        Cá nhân/tổ chức đủ tư cách pháp nhân
                                   </Box>
                                   <Box component="form" sx={{ "& > :not(style)": { m: 5 } }}>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="business_name">
                                                  Tên cá nhân (tổ chức)
                                             </InputLabel>
                                             <Input
                                                  id="business_name"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .operator.business_name
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="tax_number">
                                                  Mã số thuế
                                             </InputLabel>
                                             <Input
                                                  id="tax_number"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .operator.tax_identification_number
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="address">Địa chỉ</InputLabel>
                                             <Input
                                                  id="address"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .operator.address
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="nationality">
                                                  Quốc tịch
                                             </InputLabel>
                                             <Input
                                                  id="address"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .operator.nationality
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="phoneNumber">
                                                  Số điện thoại
                                             </InputLabel>
                                             <Input
                                                  id="phoneNumber"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .operator.phone_number
                                                  }
                                                  disabled
                                             />
                                        </FormControl>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="fax">Fax</InputLabel>
                                             <Input
                                                  id="fax"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .operator.fax
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="email">Email</InputLabel>
                                             <Input
                                                  id="email"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .operator.email
                                                  }
                                                  disabled
                                             />
                                        </FormControl>
                                   </Box>
                              </CustomTabPanel>
                              <CustomTabPanel value={currentTab} index={1}>
                                   <Box component="form" sx={{ "& > :not(style)": { m: 5 } }}>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="drone_type">
                                                  Loại drone
                                             </InputLabel>
                                             <Input
                                                  id="drone_type"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .drones[0].drone_registration.drone_type
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="factory_number">
                                                  Số xuất xưởng
                                             </InputLabel>
                                             <Input
                                                  id="factory_number"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .drones[0].drone_registration
                                                            .factory_number
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="registration_number">
                                                  Số đăng ký (đăng ký tạm thời)
                                             </InputLabel>
                                             <Input
                                                  id="registration_number"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .drones[0].drone_registration
                                                            .registration_number
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="registered_date">
                                                  Ngày cấp
                                             </InputLabel>
                                             <Input
                                                  id="registered_date"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .drones[0].drone_registration
                                                            .registration_date
                                                  }
                                                  disabled
                                             />
                                        </FormControl>
                                   </Box>
                              </CustomTabPanel>
                              <CustomTabPanel value={currentTab} index={2}>
                                   <Box component="form" sx={{ "& > :not(style)": { m: 5 } }}>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="maximum_take_off">
                                                  Khối lượng cất cánh tối đa (kg)
                                             </InputLabel>
                                             <Input
                                                  id="maximum_take_off"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .drones[0].drone_specification
                                                            .maximum_take_off_weight
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="engine_type">
                                                  Loại động cơ
                                             </InputLabel>
                                             <Input
                                                  id="engine_type"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .drones[0].drone_specification
                                                            .engine_type
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="operating_frequency">
                                                  Tần số làm việc
                                             </InputLabel>
                                             <Input
                                                  id="operating_frequency"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .drones[0].drone_specification
                                                            .operating_frequency
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="operating_method">
                                                  Phương pháp điều khiển thiết bị
                                             </InputLabel>
                                             <Input
                                                  id="operating_method"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .drones[0].drone_specification
                                                            .operating_method
                                                  }
                                                  disabled
                                             />
                                        </FormControl>
                                   </Box>
                              </CustomTabPanel>
                              <CustomTabPanel value={currentTab} index={3}>
                                   <Box component="form" sx={{ "& > :not(style)": { m: 5 } }}>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="purpose">
                                                  Mục đích sử dụng phương tiện bay
                                             </InputLabel>
                                             <Input
                                                  id="purpose"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .flight_purpose
                                                  }
                                                  disabled
                                             />
                                        </FormControl>
                                   </Box>
                              </CustomTabPanel>
                              <CustomTabPanel value={currentTab} index={4}>
                                   <Box component="form" sx={{ "& > :not(style)": { m: 5 } }}>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="place">Địa danh</InputLabel>
                                             <Input
                                                  id="place"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .flight_area[0].place
                                                  }
                                                  disabled
                                             />
                                        </FormControl>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="commune">Xã (phường)</InputLabel>
                                             <Input
                                                  id="commune"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .flight_area[0].commune
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="province">
                                                  Tỉnh (Thành phố)
                                             </InputLabel>
                                             <Input
                                                  id="province"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .flight_area[0].province
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="altitude">Độ cao (m)</InputLabel>
                                             <Input
                                                  id="altitude"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .flight_area[0].altitude
                                                  }
                                                  disabled
                                             />
                                        </FormControl>
                                   </Box>
                              </CustomTabPanel>

                              <CustomTabPanel value={currentTab} index={5}>
                                   <Box component="form" sx={{ "& > :not(style)": { m: 5 } }}>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="duration">Số ngày bay</InputLabel>
                                             <Input
                                                  id="duration"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .operating_duration.duration
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="start_time">
                                                  Ngày bắt đầu
                                             </InputLabel>
                                             <Input
                                                  id="start_time"
                                                  value={moment(
                                                       flightDetail.flight_authorization_proposal
                                                            .operating_duration.from_day
                                                  ).format("hh:mm DD/MM/YYYY")}
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="end_time">
                                                  Ngày kết thúc
                                             </InputLabel>
                                             <Input
                                                  id="end_time"
                                                  value={moment(
                                                       flightDetail.flight_authorization_proposal
                                                            .operating_duration.to_day
                                                  ).format("hh:mm DD/MM/YYYY")}
                                                  disabled
                                             />
                                        </FormControl>
                                   </Box>
                              </CustomTabPanel>

                              <CustomTabPanel value={currentTab} index={6}>
                                   <Box component="form" sx={{ "& > :not(style)": { m: 5 } }}>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="take_off_place">
                                                  Sân bay
                                             </InputLabel>
                                             <Input
                                                  id="take_off_place"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .take_off_and_landing_area.place
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="take_off_commune">
                                                  Xã (Phường)
                                             </InputLabel>
                                             <Input
                                                  id="take_off_commune"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .take_off_and_landing_area.commune
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="take_off_province">
                                                  Tỉnh (Thành phố)
                                             </InputLabel>
                                             <Input
                                                  id="take_off_province"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .take_off_and_landing_area.province
                                                  }
                                                  disabled
                                             />
                                        </FormControl>
                                   </Box>
                              </CustomTabPanel>

                              <CustomTabPanel value={currentTab} index={7}>
                                   <Box component="form" sx={{ "& > :not(style)": { m: 5 } }}>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="pilot_name">
                                                  Tên phi công
                                             </InputLabel>
                                             <Input
                                                  id="pilot_name"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .pilot.name
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="pilot_birthday">
                                                  Ngày sinh
                                             </InputLabel>
                                             <Input
                                                  id="pilot_birthday"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .pilot.birthday
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="identification_number">
                                                  CCCD/Căn cước:
                                             </InputLabel>
                                             <Input
                                                  id="identification_number"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .pilot.identification_number
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="pilot_phone">
                                                  Số điện thoại:
                                             </InputLabel>
                                             <Input
                                                  id="pilot_phone"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .pilot.phone_number
                                                  }
                                                  disabled
                                             />
                                        </FormControl>

                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="pilot_lisence">
                                                  Số giấy phép điều khiển phương tiện
                                             </InputLabel>
                                             <Input
                                                  id="pilot_lisence"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .pilot.pilot_license.license_number
                                                  }
                                                  disabled
                                             />
                                        </FormControl>
                                        <FormControl variant="standard">
                                             <InputLabel htmlFor="pilot_lisence_date">
                                                  Ngày cấp giấy phép điều khiển phương tiện
                                             </InputLabel>
                                             <Input
                                                  id="pilot_lisence_date"
                                                  value={
                                                       flightDetail.flight_authorization_proposal
                                                            .pilot.pilot_license
                                                            .license_provision_date
                                                  }
                                                  disabled
                                             />
                                        </FormControl>
                                   </Box>
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
