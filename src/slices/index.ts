import { combineReducers } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import { withReduxStateSync } from "redux-state-sync";

import counterReducer from "@/slices/counterSlice";
import themeReducer from "@/slices/themeSlice";
import mapTrackReducer from "@/slices/sd/mapTrackSlice";
import mapSDReducer from "@/slices/sd/mapSlice";
import drawerReducer from "@/slices/td/drawerSlice";
import dataSourceReducer from "@/slices/td/dataSourceSlice";
import droneReducer from "@/slices/sd/droneSlice";
import flightAreaReducer from "@/slices/sd/flightAreaSlice";
import directCommandReducer from "@/slices/sd/directCommandSlice";
import flightCorridorReducer from "@/slices/sd/flightCorridorSlice";
import hubReducer from "@/slices/sd/hubSlice";
import flightLaneReducer from "@/slices/sd/flightLaneSlice";
import menuReducer from "@/slices/sd/menuSlice";
import trackReducer from "@/slices/sd/trackSlice";
import uiControlReducer from "@/slices/sd/uiControlSlice";

const rootReducer = combineReducers({
     counter: counterReducer,
     theme: themeReducer,
     mapTrack: mapTrackReducer,
     mapSD: mapSDReducer,
     drawer: drawerReducer,
     dataSource: dataSourceReducer,
     drone: droneReducer,
     flightArea: flightAreaReducer,
     directCommand: directCommandReducer,
     flightCorridor: flightCorridorReducer,
     hub: hubReducer,
     flightLane: flightLaneReducer,
     mainMenu: menuReducer,
     uiControl: uiControlReducer,
     track: trackReducer,
});

enableMapSet();

export default withReduxStateSync(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
