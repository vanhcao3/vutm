import { RootState } from "@/slices";
import { MenuState } from "@/slices/sd/menuSlice";
import { useSelector } from "react-redux";
import { MapForm } from "./MapForm/MapForm";
import { SettingForm } from "./SettingForm/SettingForm";
import { StatisticPanel } from "./StatisticForm/StatisticPanel";

export const MenuForm = () => {
     const currentMenu = useSelector((state: RootState) => state.mainMenu.currentMenuState);

     switch (currentMenu) {
          case MenuState.FILTER:
               return <></>;
          case MenuState.SETTING:
               return <SettingForm />;
          case MenuState.DEFAULT:
               return <></>;
          case MenuState.STATISTIC:
               return <StatisticPanel />;
          case MenuState.MAP:
               return <MapForm />;
          default:
               return <></>;
     }
};
