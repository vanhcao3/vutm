import { Button as MUIButton } from "@mui/material";
import NotificationService from "@/utils/notification";
import { useTranslation } from "react-i18next";

export function DemoNotification() {
    const { t, i18n } = useTranslation();

    const notificationClick = (event) => {
        console.log("event", event)
    }
    return (
        <div>
            <MUIButton sx={{ mx: "auto" }} variant='outlined' onClick={() => NotificationService.success(t("success"), t("Message"), (event) => notificationClick(event))}>
                Success Notification
            </MUIButton>
            <MUIButton sx={{ mx: "auto" }} variant='outlined' onClick={() => NotificationService.error(t("error"), t("Message"))}>
                Error Notification
            </MUIButton>
            <MUIButton sx={{ mx: "auto" }} variant='outlined' onClick={() => NotificationService.warn(t("warning"), t("Message"))}>
                Warning Notification
            </MUIButton>
        </div >
    )
}
