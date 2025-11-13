import { a11yProps } from "@/utils/convert";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";


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

export interface TabProperties {
    title: string,
    child?: React.ReactNode
}
export interface VTTabProps {
    listTabs: TabProperties[],
    child?: React.ReactNode
}

export const VTTabs = (props: VTTabProps) => {
    const [tabValue, setTabValue] = useState<number>(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const { listTabs } = props;
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable">
                    {listTabs?.map((tab: TabProperties, index: number) => {
                        return (
                            <Tab
                                key={`${tab.title}_${index}`}
                                label={tab.title}
                                {...a11yProps(index)}
                                value={index}
                            />
                        );
                    })}
                </Tabs>
            </Box>
            {listTabs.map((tab: TabProperties, index: number) => {
                return (
                    <TabPanel key={`tabpanel-${index}`} value={tabValue} index={index}>
                        {tab.child}
                    </TabPanel>
                );
            })}
        </Box>
    );
}