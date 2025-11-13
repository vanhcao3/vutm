
import { ToastContainer, Zoom, toast, Slide, Theme } from "react-toastify";
export interface NotificationProps {
    themeType: Theme,
    child?: React.ReactNode
}

export const Notification = (props: NotificationProps) => {
    return (
        <ToastContainer
            theme={props.themeType == "light" ? "dark" : "light"}
            closeButton={true}
            autoClose={5000}
            transition={Slide}
            enableMultiContainer
            hideProgressBar={false}
            pauseOnFocusLoss={false}
            position={toast.POSITION.TOP_RIGHT}
            draggable={false}
            limit={10}
        />
    );
};