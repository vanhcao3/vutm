import { AxiosFactory } from "@/lib/axios";
import { FlightCorridor, FlightLane } from "../types";

const flightCorridorService = AxiosFactory("https://airtransys.site:9443/at-flight-corridor");

export const getAllFlightCorridors = (): Promise<Array<FlightCorridor>> => {
     return flightCorridorService.get("/flight_corridors");
};

export const updateFlightCorridor = (corrdior: FlightCorridor) => {
     return flightCorridorService.put(`/flight_corridors/${corrdior.id}`);
};

export const getAllFlightLanes = (): Promise<Array<FlightLane>> => {
     return flightCorridorService.get("/flight_lanes");
};

export const updateFlightLane = (lane: FlightLane) => {
     return flightCorridorService.put(`/flight_corridors/${lane.id}`);
};

export const getFlightLaneDetail = (id: string): Promise<FlightLane> => {
     return flightCorridorService.get(`/flight_lanes/${id}`);
};
