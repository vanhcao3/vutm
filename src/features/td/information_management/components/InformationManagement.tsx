import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useSelector } from "react-redux";
import { Privilege } from "@/types";
import React, { useState } from "react";
import { a11yProps } from "@/utils/convert";

interface TabPanelProps {
     children?: React.ReactNode;
     index: number;
     value: number;
}

const TabPanel = (props: TabPanelProps) => {
     const { children, value, index, ...other } = props;

     return (
          <div
               role="tabpanel"
               hidden={value !== index}
               id={`simple-tabpanel-${index}`}
               aria-labelledby={`simple-tab-${index}`}
               {...other}
          >
               {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
          </div>
     );
};

export const InformationManagement = () => {
     const { tabs } = useSelector((state: any) => state.drawer);
     const [tabValue, setTabValue] = useState<number>(0);

     const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
          setTabValue(newValue);
     };

     return (
          <Box sx={{ width: "100%" }}>
               <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                         {tabs.map((tab: Privilege, index: number) => {
                              return (
                                   <Tab
                                        key={`${tab.name}_${index}`}
                                        label={tab.name}
                                        {...a11yProps(index)}
                                        value={tabValue}
                                   />
                              );
                         })}
                    </Tabs>
               </Box>
               {tabs.map((tab: Privilege, index: number) => {
                    return (
                         <TabPanel key={`tabpanel-${index}`} value={tabValue} index={index}>
                              {tab.name}
                         </TabPanel>
                    );
               })}
          </Box>
     );
};
