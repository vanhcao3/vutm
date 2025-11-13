import { AxiosFactory } from "@/lib/axios";
import { DroneCommand } from "../types";

const droneCommandService = AxiosFactory("https://airtransys.site:9443/at-command");

export const getAllDroneCommand = () => {
     return droneCommandService.get("/commands");
};

export const filterDroneCommand = (
     segmentIndex: number,
     orderId: string
): Promise<DroneCommand[]> => {
     return droneCommandService.get(
          `/commands/search?filter[segment_index]=${segmentIndex}&filter[order_id]=${orderId}`
     );
};
