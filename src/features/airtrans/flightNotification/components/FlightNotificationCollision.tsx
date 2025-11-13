import { WarningAmber } from "@mui/icons-material";
import {
     Button,
     Dialog,
     DialogActions,
     DialogContent,
     DialogContentText,
     DialogTitle,
} from "@mui/material";

export const FlightNotificationCollision = () => {
     return (
          <Dialog open maxWidth={false}>
               <DialogTitle>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                         <WarningAmber sx={{ width: "40px", height: "40px", fill: "yellow" }} />
                         <div>CẢNH BÁO</div>
                    </div>
               </DialogTitle>
               <DialogContent>
                    <DialogContentText>
                         Thông báo bay của Công ty TNHH Công nghệ Hàng không Việt Nam <br /> bị xung
                         đột về thời gian với thông báo bay của Aero Dynamics Co.
                    </DialogContentText>
               </DialogContent>
               <DialogActions>
                    <Button>Xác nhận</Button>
               </DialogActions>
          </Dialog>
     );
};
