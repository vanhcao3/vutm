export enum OrderStatus {
     UNKNOWN = 0,
     PENDING = 1,
     IN_DELIVERY = 2,
     DELIVERED = 3,
}

export enum OrderSize {
     UNKNOWN = 0,
     SMALL = 1,
     MEDIUM = 2,
     LARGE = 3,
     OVERSIZED = 4,
}

export enum OrderPriority {
     UNKNOWN = 0,
     NORMAL = 1,
     HIGH = 2,
}

export enum SegmentStatus {
     UNKNOWN = 0,
     UNFINISHED = 1,
     FINISHED = 2,
}

export enum SEGMENT_TYPE {
     UNKNOWN = 0,
     PRE_DELIVERY = 1,
     IN_DELIVERY = 2,
     RETURN_ROUTE = 3,
}

export interface Segment {
     segment_index: number;
     source: string;
     dest: string;
     flight_lane_id: string;
     segment_status: SegmentStatus;
     drone_id: string;
     segment_type: SEGMENT_TYPE;
}

export interface Order {
     id: string;
     source: string;
     dest: string;
     order_status: OrderStatus;
     user_create_id: string;
     weight: number;
     size: OrderSize;
     priority: OrderPriority;
     corridor_id: string;
     start_lane_id: string;
     end_lane_id: string;
     eta: number;
     updated_at: number;
     created_at: number;
     drone_id: string;
     receiver_phone: string;
     created_by: string;
     segments: Array<Segment>;
}
