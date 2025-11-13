export enum DirectCommandStatus {
     SENT = 0,
     RECEIVED = 1,
     CONFIRMED = 2,
     FINISHED = 3,
}

export interface DirectCommand {
     content: string;
     created_at: number;
     created_by: string;
     dest: string;
     id: string;
     src: string;
     updated_at: number;
     updated_by: string;
}

export enum CommandStatus {
     UKNOWN = 0,
     SENT = 1,
     ACK = 2,
     CANCELED = 3,
}

export enum CommandType {
     UNKNOWN = 0,
     START = 1,
     FINISH = 2,
}

export interface DroneCommand {
     command_status: CommandStatus;
     command_type: CommandType;
     content: string;
     created_at: number;
     updated_at: number;
     drone_id: string;
     gcs_id: string;
     id: string;
     is_request: boolean;
     order_id: string;
     segment_index: number;
     source: string;
     updated_by: string;
}
