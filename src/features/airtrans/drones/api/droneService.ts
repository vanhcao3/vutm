import { AxiosFactory } from "@/lib/axios";
import { Drone, Track, TrackHistory } from "../types";

const droneService = AxiosFactory("https://airtransys.site:9443/at-drone");

export const getAllDrones = (): Promise<Drone[]> => {
     return droneService.get("/drones");
};

export const getAllTracks = (): Promise<Track[]> => {
     return droneService.get("/object_tracks");
};

export const getTrackById = (id: number): Promise<Track> => {
     return droneService.get(`/object_tracks/${id}`);
};

export const searchHistoryById = (id: number, size = 50): Promise<Array<TrackHistory>> => {
     return droneService.get(
          `/track_historys/search?page[page]=0&page[size]=${size}&sort=-created_at&filter[track_id]=${id}`
     );
};
