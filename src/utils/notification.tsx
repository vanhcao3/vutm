import { Divider } from "@mui/material";
import { toast } from "react-toastify";

export interface MsgProps {
    title: string,
    message?: string,
}
const Msg = (props: MsgProps) => (
    <div>
        <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>{props.title?.toUpperCase()}</h1>
        <Divider style={{ backgroundColor: "#747e7b" }} />
        <p>{props.message}</p>
    </div>
)

const NotificationService = {
    success: (title, message?, onTap?: (e) => void) => {
        toast.success(<Msg title={title} message={message} />, { onClick: onTap });
    },
    error: (title, message?, onTap?: (e) => void) => {
        toast.error(<Msg title={title} message={message} />, { onClick: onTap });
    },
    warn: (title, message?, onTap?: (e) => void) => {
        toast.warn(<Msg title={title} message={message} />, { onClick: onTap });
    }
};
export default NotificationService;