import {
     Button,
     Dialog,
     DialogActions,
     DialogContent,
     DialogContentText,
     DialogTitle,
} from "@mui/material";
import { t } from "i18next";

export interface AlertDialogProps {
     title: string;
     content: string;
     onAgree: () => void;
     onClose: () => void;
     open: boolean;
}

export const AlertDialog = ({ title, content, onAgree, onClose, open }: AlertDialogProps) => {
     return (
          <Dialog open={open} onClose={onClose}>
               <DialogTitle>{t(`${title}`)}</DialogTitle>
               <DialogContent>
                    <DialogContentText>{t(`${content}`)}</DialogContentText>
               </DialogContent>
               <DialogActions>
                    <Button onClick={onAgree}>{t("agree")}</Button>
                    <Button onClick={onClose}>{t("cancel")}</Button>
               </DialogActions>
          </Dialog>
     );
};
