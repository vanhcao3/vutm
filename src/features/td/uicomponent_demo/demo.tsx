import { ContentLayout } from "@/components/Layout";
import { TabProperties, VTTabs } from "@/components/VTTabs";
import { a11yProps } from "@/utils/convert";
import { Box, Icon, Button as MUIButton, Tab, Tabs } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { DemoNotification } from "./components/demo_notification";
import { DemoDialog } from "./components/demo_dialog";
import { DemoTreeGraph } from "./components/demo_treeGraph/demo_treeGraph";
import { DemoTreeTable } from "./components/demo_tree_table";
import { DemoTable } from "./components/demo_table";
import { DemoPopout } from "./components/demo_popout";
import { DemoColorPicker } from "./components/demo_color_picker";
import { DemoMenuList } from "./components/demo_menu_list";
import { DemoImagePdfView } from "./components/demo_image_pdf_view";
import { DemoAutocomplete2 } from "./components/demo_autocomplete2";
import { DemoDnd } from "./components/demo_drag_drop/demo_dnd";
import { DemoAutocomplete1 } from "./components/demo_autocomplete1";

export function DemoComponent() {
    const { t, i18n } = useTranslation();
    const tabList: TabProperties[] = [
        {
            title: "Notification",
            child: (<DemoNotification />)
        },
        {
            title: "Dialog",
            child: (<DemoDialog />)
        },
        {
            title: "Table",
            child: (<DemoTable />)
        },
        {
            title: "Tree Table",
            child: (<DemoTreeTable />)
        },
        {
            title: "Tree Graph",
            child: (<DemoTreeGraph />)
        },
        {
            title: "Color picker",
            child: (<DemoColorPicker />)
        },
        {
            title: "Menu list",
            child: (<DemoMenuList />)
        },
        {
            title: "Drag Drop",
            child: (<DemoDnd />)
        },
        {
            title: "Image/PDF viewer",
            child: (<div><DemoImagePdfView /></div>)
        },
        {
            title: "Autocomplete 1",
            child: (<div><DemoAutocomplete1 /></div>)
        },
        {
            title: "Autocomplete 2",
            child: (<div><DemoAutocomplete2 /></div>)
        },
        {
            title: "Popout",
            child: (<DemoPopout></DemoPopout>)
        },
    ]
    return (
        <ContentLayout title="Demo">
            <VTTabs listTabs={tabList} />
        </ContentLayout>
    )
}