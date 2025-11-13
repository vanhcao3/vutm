import { AxiosFactory } from "@/lib/axios";
import { Track } from "../types";

const TrackApiService = AxiosFactory("http://192.168.205.104:30002");

export const getTracks = (): Promise<Track[]> => {
     return TrackApiService.get("/tracks");
};
