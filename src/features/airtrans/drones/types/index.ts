// eslint-disable-next-line no-restricted-imports
import { PolarVelocity } from "@/features/sd/map2d/components/TrackLayer/types";

export interface Drone {
     drone_id: string;
     longitude: number;
     latitude: number;
     altitude: number;
     rtsp_link: string;
     gcs_id: string;
     status: string;
     speed: number;
     heading: number;
     battery: number;
}

export interface DroneInfo {
     created_by: string;
     deport_id: string;
     gcs_id: string;
     id: string;
     mass: number;
     max_battery: number;
     max_payload: number;
     max_power: number;
     max_speed: number;
     rtsp_link: string;
     size: Array<number>;
     updated_at: number;
     name: string;
     validate_status: string;
}

export interface GeodeticPosition {
     longitude: number;
     latitude: number;
     altitude: number;
}

export interface CartesianVelocity {
     vx: number;
     vy: number;
     vz: number;
}

export interface Track {
     id: string;
     object_id: string;
     object_track_id: number;
     position: GeodeticPosition;
     created_at: number;
     speed: PolarVelocity;
     updated_at: number;
     polar_velocity: PolarVelocity;
}

export enum TrackType {
     UFO = "UFO",
     DRONE = "DRONE",
}

export interface TrackHistory {
     location_json: {
          geodetic_position: {
               longitude: number;
               latitude: number;
               altitude: number;
          };
     };

     track_history: {
          id: string;
          track_id: number;
          location_byte: string;
          created_at: number;
     };
}
