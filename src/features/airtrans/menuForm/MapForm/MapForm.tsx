/* eslint-disable jsx-a11y/click-events-have-key-events */
import "./mapFormStyle.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/slices";
import { MAP_MENU, setCurrentMap } from "@/slices/sd/uiControlSlice";

export const MapForm = () => {
     const dispatch = useDispatch();
     const selectedMap = useSelector((state: RootState) => state.uiControl.selectedMap);

     const handleSelectMap = (index: number) => {
          dispatch(setCurrentMap(MAP_MENU[index]));
     };

     return (
          <div className="map-settings">
               {MAP_MENU.map((item, index) => {
                    return (
                         // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                         <div
                              key={`map_menu_${index}`}
                              className="map-item-setting"
                              onClick={() => handleSelectMap(index)}
                         >
                              <img
                                   style={{
                                        border:
                                             item.url === selectedMap.url
                                                  ? "5px solid green"
                                                  : "none",
                                   }}
                                   src={item.img}
                                   alt=""
                              />
                              <div>{item.label}</div>
                         </div>
                    );
               })}
          </div>
     );
};
