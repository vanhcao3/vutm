/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "../styles/droneStyle.scss";
import { useEffect, useState } from "react";
import Settings from "@mui/icons-material/Settings";

export const FilterTool = () => {
     const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false);

     const handleClickSetting = () => {
          setIsOpenSettings((prev) => !prev);
     };

     return (
          <div className="filter-toolbar" onClick={handleClickSetting}>
               <Settings sx={{ margin: "auto" }} />
          </div>
     );
};
