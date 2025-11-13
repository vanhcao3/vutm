import { useEffect, useState } from "react";
import moment from "moment";
import { Box, Typography } from "@mui/material";

const SDTimer = () => {
     const [currentTime, setCurrentTimeState] = useState<string>();

     useEffect(() => {
          const interval = setInterval(() => {
               setCurrentTimeState(moment().locale("vi").format("HH:mm:ss DD/MM/YY"));
          }, 1000);
          return () => clearInterval(interval);
     }, []);

     return (
          <Box
               style={{
                    position: "absolute",
                    bottom: "7px",
                    right: "4%",
                    padding: "5px",
                    zIndex: 1,
                    // color: "white",
                    // background: "#3e545b",
               }}
          >
               <Typography>{currentTime}</Typography>
          </Box>
     );
};

export default SDTimer;
