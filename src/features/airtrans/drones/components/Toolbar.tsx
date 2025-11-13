/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import IconButton from "@mui/material/IconButton";
import "../styles/droneStyle.scss";
import { DonutSmall, Filter, FilterAltOutlined, Map, Settings } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { MenuState, setCurrentMenu } from "@/slices/sd/menuSlice";
export const Toolbar = () => {
     const dispatch = useDispatch();

     const handleClickItem = (item: MenuState) => {
          dispatch(setCurrentMenu(item));
     };

     return (
          <div className="drone-toolbar">
               {/* <span style={{ margin: "auto" }}>Số lượng Drone: 20</span> */}
               {/* <span style={{ margin: "auto" }}>Số lượng Locker: 4</span> */}

               <div className="toolbar-item">
                    <IconButton>
                         <FilterAltOutlined />
                    </IconButton>
                    <span>Lọc</span>
               </div>

               <div className="toolbar-item" onClick={() => handleClickItem(MenuState.STATISTIC)}>
                    <IconButton>
                         <DonutSmall />
                    </IconButton>
                    <span>Thống kê</span>
               </div>

               <div className="toolbar-item" onClick={() => handleClickItem(MenuState.SETTING)}>
                    <IconButton>
                         <Settings />
                    </IconButton>
                    <span>Cài đặt</span>
               </div>

               <div className="toolbar-item" onClick={() => handleClickItem(MenuState.MAP)}>
                    <IconButton>
                         <Map />
                    </IconButton>
                    <span>Bản đồ</span>
               </div>
          </div>
     );
};
