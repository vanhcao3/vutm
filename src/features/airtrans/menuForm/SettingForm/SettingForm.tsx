import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/slices";
import { useState, useEffect } from "react";
import "./settingFormStyle.scss";
import { toggleDataSourceDisplay } from "@/slices/td/dataSourceSlice";

const settings = [
     { id: 0, name: "Hiển thị nguồn dữ liệu" },
     { id: 1, name: "Cài đặt 1" },
     { id: 2, name: "Cài đặt 2" },
     { id: 3, name: "Cài đặt 3" },
];

export const SettingForm = () => {
     const dispatch = useDispatch();
     const [activeMenu, setActiveMenu] = useState<number | null>(null);
     const dataSourceList = useSelector((state: RootState) => state.dataSource.dataSourceList);

     const handleClick = (id: number) => {
          setActiveMenu((prev) => (prev === id ? null : id));
     };

     return (
          <div className="setting-form">
               {settings.map((setting, index) => (
                    <>
                         <button
                              key={`setting_menu_${index}`}
                              onClick={() => handleClick(setting.id)}
                              className={`setting-item ${
                                   activeMenu === setting.id ? "clicked" : ""
                              }`}
                         >
                              <div>{setting.name}</div>
                         </button>
                         {setting.id === 0 && activeMenu === 0 && (
                              <div>
                                   {dataSourceList.map((item) => (
                                        <label key={item.id} style={{ display: "block" }}>
                                             <input
                                                  type="checkbox"
                                                  style={{ marginRight: "8px" }}
                                                  checked={
                                                       item.is_display === undefined
                                                            ? true
                                                            : item.is_display
                                                  }
                                                  onChange={() =>
                                                       dispatch(toggleDataSourceDisplay(item.id))
                                                  }
                                             />
                                             {item.datasource_add}
                                        </label>
                                   ))}
                              </div>
                         )}
                    </>
               ))}
          </div>
     );
};
