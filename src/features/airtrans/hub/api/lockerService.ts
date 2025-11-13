import { AxiosFactory } from "@/lib/axios";
import { Hub } from "../types";

const hubService = AxiosFactory("https://airtransys.site:9443/at-locker");

export const getAllHubs = (): Promise<Array<Hub>> => {
     return hubService.get("/hubs");
};
