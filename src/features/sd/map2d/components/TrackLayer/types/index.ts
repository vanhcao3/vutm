export interface Client {
     id: string;
     ip: string;
     role: string;
     user: string;
}

export interface Node {
     id: string;
     name: string;
     ip: string;
     enabled: boolean;
     level: number;
     type: number;
     additionalInfo: Record<string, any>;
     connectionStatus: number;
     parent: boolean;
     clients: Client[];
}

export interface Size {
     length: number;
     width: number;
     height: number;
}

export interface SourceInfo {
     id: string;
     sourceType: number;
     sourceLevel: number;
}

export interface AircraftInfo {
     mode3a: string;
     modeS: string;
     aircraftType: number;
     aircraftCount: number;
     specialLabel: string;
}

export interface VesselInfo {
     description?: any;
     imoNumber: number;
     vesselType: number;
     vesselOperation: number;
}

export interface AISInfo {
     toBow: number;
     toStern: number;
     toStarboard: number;
     toPort: number;
     draught: number;
     transponderClass: number;
     positionFixingDevice: number;
     navigationStatus: number;
     eta: number;
     positionAccurate: boolean;
     specialManeuverIndicator: number;
}

export interface TrackInfo {
     name: string;
     callSign: string;
     countryCode: string;
     friendFoeState: number;
     targetSize?: Size;
     departureLocation: string;
     arrivalLocation: string;
     mmsi: number;
     aisInfo?: AISInfo;
     aircraftInfo?: AircraftInfo;
     vesselInfo?: VesselInfo;
}

export interface PolarVelocity {
     speed: number;
     heading: number;
}

export interface PolarPosition {
     range: number;
     azimuth: number;
     elevation: number;
}

export interface GeodeticPosition {
     description?: any;
     longitude: number;
     latitude: number;
     altitude: number;
}

export interface AFADInfo {
     description?: any;
     trackNumber: number;
     trackQuality: number;
     note: string;
     airRoute: string;
     tailNumber: string;
     trackAttribute: string;
}

export interface EWElintRadarInfo {
     description?: any;
     pulseWidth: number;
     repeatedInterval: number;
     radarType: string;
}

export interface EWElintTargetInfo {
     description?: any;
     radarName: string;
     radarType: string;
     elintObjectType: string;
     ewAircraftType: string;
     ewAircraftModel: string;
     operationMode: number;
     jammingStatus: number;
     verificationResult: number;
     isMarkedTarget?: boolean;
     markedTarget?: boolean;
}

export interface EWComintTargetInfo {
     description?: any;
     modulation: string;
     power?: number;
     bandwidth: number;
     comintObjectType: string;
     targetType: string;
     communicationProperty: string;
     operationMode: number;
     jammingStatus: number;
     verificationResult: number;
     isMarkedTarget?: boolean;
     markedTarget?: boolean;
}

export interface EWIndirectComintTargetInfo {
     description?: any;
     modulation: string;
     comintObjectType: string;
     targetType: string;
}

export interface EWInfo {
     ewType: number;
     frequency: number;
     description?: any;
     note: string;
     startTimestamp: number;
     detectionDuration: number;
     elintRadarInfo: EWElintRadarInfo;
     elintTargetInfo: EWElintTargetInfo;
     comintTargetInfo: EWComintTargetInfo;
     indirectComintTargetInfo: EWIndirectComintTargetInfo;
}

export interface Track {
     id?: number;
     targetType: number;
     sourceInfo?: SourceInfo;
     trackInfo: TrackInfo;
     polarVelocity: PolarVelocity;
     polarPosition?: PolarPosition;
     geodeticPosition: GeodeticPosition;
     trackingMode: number;
     activeMode: number;
     createdTimestamp?: number;
     lastUpdatedTimestamp?: number;
     timestamp?: number;
     afadInfo?: AFADInfo;
     ewInfo?: EWInfo;
     groups?: number[];
}

export interface TrackHistory {
     id?: string;
     name: string;
     listTrackId: any[];
}
