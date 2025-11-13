export interface IntendedFlightAreaCoordinate {
     id: string;
     intended_flight_area_id: string;
     latitude: number;
     longitude: number;
}

export interface IntendedFlightArea {
     id: string;
     flight_notification_id: string;
     place: string;
     commune: string;
     province: string;
     polygon: IntendedFlightAreaCoordinate[];
     altitude: string;
}

export interface FlightNotification {
     id: string;
     name: string;
     flight_authorization_approval_id: string;
     flight_authorization_approval: FlightAuthorizationApproval;
     intended_operating_duration: OperatingDuration;
     intended_flight_area: IntendedFlightArea[];
}

export interface TakeOffAndLandingArea {
     place: string;
     commune: string;
     province: string;
     latitude: number;
     longitude: number;
}

export interface FlightParameter {
     id: string;
     flight_authorization_approval_id: string;
     altitude: string;
     radius: string;
     take_off_and_landing_area: TakeOffAndLandingArea;
}

export interface AuthorizedFlightAreaCoordinate {
     id: string;
     authorized_flight_area_id: string;
     latitude: number;
     longitude: number;
}

export interface AuthorizedFlightArea {
     id: string;
     flight_authorization_approval_id: string;
     place: string;
     commune: string;
     province: string;
     polygon: AuthorizedFlightAreaCoordinate[];
     altitude: string;
}

export interface OperatingDuration {
     duration: number;
     from_day: string;
     to_day: string;
}

export interface FlightAuthorizationApproval {
     id: string;
     name: string;
     flight_authorization_proposal_id: string;
     flight_area: AuthorizedFlightArea[];
     flight_parameter: FlightParameter;
     operating_duration: OperatingDuration;
     flight_negotiation_authorities: string[];
     operator: Operator;
     drones: Drone[];
     flight_authorization_proposal: FlightAuthorizationProposal;
     created_at: string;
     updated_at: string;
}

export interface AuthorizationLog {
     id: string;
     result: string;
     user_id: string;
     username: string;
     resource: string;
     action: string;
     timestamp: number;
     client: string;
     uri: string;
}

export interface Example {
     id: string;
     something: AuthorizationLog;
}

export interface Operator {
     id: string;
     flight_authorization_proposal_id: string;
     business_name: string;
     tax_identification_number: string;
     address: string;
     nationality: string;
     phone_number: string;
     fax?: string;
     email?: string;
}

export interface Dimension {
     length: number;
     width: number;
     height: number;
}

export interface DroneSpecification {
     maximum_take_off_weight: number;
     dimension: Dimension;
     engine_type?: string;
     operating_frequency?: string;
     operating_method: string;
}

export interface DroneRegistration {
     drone_type: string;
     factory_number: string;
     registration_number: string;
     registration_date: string;
}

export interface Drone {
     id: string;
     flight_authorization_proposal_id: string;
     drone_specification: DroneSpecification;
     drone_registration: DroneRegistration;
}

export interface FlightAreaCoordinate {
     id: string;
     flight_area_id: string;
     latitude: number;
     longitude: number;
}

export interface FlightArea {
     id: string;
     flight_authorization_proposal_id: string;
     place: string;
     commune: string;
     province: string;
     polygon: FlightAreaCoordinate[];
     altitude: string;
}

export interface PilotLicense {
     license_number: string;
     license_provision_date: string;
}

export interface Pilot {
     id: string;
     flight_authorization_proposal_id: string;
     name: string;
     birthday: string;
     identification_number: string;
     phone_number: string;
     pilot_license: PilotLicense;
}

export type FlightAuthorizationProposalStatus =
     | "PENDING"
     | "APPROVED"
     | "NOTIFIED"
     | "ACTIVATED"
     | "COMPLETED";

export interface FlightAuthorizationProposal {
     id: string;
     name: string;
     operator: Operator;
     drones: Drone[];
     flight_purpose: string;
     flight_area: FlightArea[];
     operating_duration: OperatingDuration;
     airport: string;
     pilot: Pilot;
     file_paths: string[];
     status: FlightAuthorizationProposalStatus;
     created_at: string;
     updated_at: string;
}

export interface AllFlightNotificationResponse {
     data: FlightNotification[];
     page: number;
     size: number;
     total: number;
}
