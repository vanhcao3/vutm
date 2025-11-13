import { AxiosFactory } from "@/lib/axios";
import { DroneInfo } from "../../drones/types";

const droneListService = AxiosFactory("https://airtransys.site:9443/at-drone");

export const getAllListDrone = (): Promise<DroneInfo[]> => {
     return droneListService.get("/drones");
};
