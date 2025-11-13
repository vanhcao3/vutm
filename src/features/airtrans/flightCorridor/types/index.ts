/* eslint-disable no-restricted-imports */
import { PolarVelocity } from "@/features/sd/map2d/components/TrackLayer/types";

export interface WayPoint {
     longitude: number;
     latitude: number;
     altitude: number;
}

export interface WayPointWithDetail {
     longitude: number;
     latitude: number;
     altitude: number;
     eta: number;
     polar_velocity: PolarVelocity;
}

export enum ValidateStatus {
     CREATED = 0,
     SENT = 1,
     APPROVED = 2,
}

export interface FlightCorridor {
     id: string;
     created_by: string;
     name: string;
     offset: number;
     position: Array<WayPoint>;
     created_at: number;
     description: string;
     validate_status: ValidateStatus;
     locker_id_list: Array<string>;
}

export interface FlightLane {
     id: string;
     offset: number;
     position: Array<WayPointWithDetail>;
     user_id: string;
     corridor_id: string;
     created_at: number;
     created_by: string;
     validate_status: ValidateStatus;
     start_locker_id: string;
     end_locker_id: string;
     delay_time: number;
}
