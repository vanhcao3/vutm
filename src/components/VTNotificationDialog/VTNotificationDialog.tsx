import './VTNotificationDialog.scss';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import clsx from 'clsx';
import { t } from "i18next";

interface FooterProps {
    /**
     * Tên button
     */
    title: string;
    /**
     * Hàm xử lý chức năng button
     */
    baseFunction: any;
}
interface VTNotificationDialogProps {
    /**
     * Thêm className
     */
    className?: string;
    /**
     * Tiêu đề cho Dialog
     */
    title: string;

    /**
     * Nội dung trong dialog
     */
    content?: string;
    /**
     * Giá trị truyền vào có thể là một string hoặc JSX
     */
    children?: any;
    /**
     * Truyền vào một mảng button
     * @default false
     */
    footer?: FooterProps[];
    /**
     * Hàm tắt Dialog
     */
    onClose: () => void;
    /**
     * trạng thái bật tắt của Dialog
     */
    open: boolean;

    /**
     * data do nguoi dung truyen vao, duoc emit khi nguoi dung click vao action trong footer
     */
    metaData?: any;
}

/**
 * Demos:
 * 
 * - demo_dialog.tsx
 */
export function VTNotificationDialog(props: VTNotificationDialogProps) {
    const { className, title, content, children, open, onClose, footer = false, metaData } = props;

    return (
        <Dialog open={open} onClose={onClose} className='dialog-wrapper'>
            <div className={clsx(className, "min-w-[150px]")}>
                <DialogTitle className='flex justify-between border-b'>
                    <div>{t(`${title}`)}</div>
                    <div role='presentation' onClick={onClose} className='cursor-pointer'>X</div>
                </DialogTitle>
                <DialogContent className="mt-2">
                    {content &&
                        <DialogContentText>{content}</DialogContentText>
                    }
                    {children &&
                        <DialogContentText>{children(metaData, onClose)}</DialogContentText>
                    }
                </DialogContent>
                {footer &&
                    <DialogActions>
                        {footer.map((item, index) => {
                            return <Button key={index} onClick={() => item.baseFunction(metaData)}>{item.title}</Button>;
                        })}
                    </DialogActions>
                }
            </div>
        </Dialog>
    );
}