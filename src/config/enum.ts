export enum FormType {
  Default = 'default',
  Track = 'track',
  Vector = 'vector',
  Setting = 'setting',
  VesselTrack = 'vesselTrack',
  Filter = 'filter',
  Session = 'session',
  Statistic = 'statistic',
  Vectors = 'vectors',
  Note = 'note',
  GroupTrack = 'groupTrack',
  GroupTracks = 'groupTracks',
  HistoryChange = 'historyChange',
  FlightPlan = 'flightPlan',
  MilitaryGrid = 'militaryGrid',
  CalculateDistance = 'calculateDistance',
  CalculateArea = 'calculateArea',
  CenterPoint = 'centerPoint',
}

export enum FormMode {
  View = 'view',
  Edit = 'edit',
  Create = 'create',
}

export enum TargetType {
  Unknown = 0,
  Aircraft = 1,
  Vessel = 2,
  GroundVehicle = 3,
}

export enum ZoneShape {
  Circle = 'Circle',
  Polygon = 'Polygon',
}

export enum EwType {
  Unknown = -1,
  ElintRadar = 0,
  ElintTarget = 1,
  ComintTarget = 2,
  IndirectComintTarget = 3,
}

export enum TrackImage {
  AircraftTrack = 'AIRCRAFT_TRACK_IMAGE',
  ElintRadar = 'ELINT_RADAR_IMAGE',
  HighComint = 'HIGH_COMINT_IMAGE',
  LowComint = 'LOW_COMINT_IMAGE',
  VesselTrack = 'VESSEL_TRACK_IMAGE',
  UnknownTrack = 'UNKNOW_TRACK_IMAGE',
  GroundTrack = 'GROUND_TRACK_IMAGE',
  SubMarineTrack = 'SUBMARINE_TRACK_IMAGE',
  UnconfirmTrack = 'UN_CONFIRM_TARGET_IMAGE',
}

export enum SelectorType {
  Default = 'default',
  FilterCoordinates = 'filter-coordinates',
  FlightRouteCircle = 'flight-route-circle',
  WeatherZonePolygon = 'weather-zone-polygon',
  WeatherZonePolygonEdit = 'weather-zone-polygon-edit',
  FilterZoneCircle = 'filter-zone-circle',
  FilterZonePolygon = 'filter-zone-polygon',
  FilterZonePolygonEdit = 'filter-zone-polygon-edit',
}

export enum SelectorShape {
  None = '',
  Circle = 'circle',
  Polygon = 'polygon',
  PolygonEdit = 'polygon-edit',
  Point = 'point',
}

export enum ContextMenuType {
  Default = 'default',
  Note = 'note',
  Track = 'track',
  TrackAuto = 'trackAuto',
  TrackConfirm = 'trackConfirm',
  MeasurementVector = 'measurementVector',
}

export enum FlightType {
  Training = 'FLIGHT_TYPE_TRAINING',
  Mission = 'FLIGHT_TYPE_MISSION',
}

export const flightTypes = [
  { value: 'FLIGHT_TYPE_TRAINING', name: 'flightPlan.flight.FLIGHT_TYPE_TRAINING' },
  { value: 'FLIGHT_TYPE_MISSION', name: 'flightPlan.flight.FLIGHT_TYPE_MISSION' },
];

export const timeStarts = [
  { value: 0, name: 'timeStart.0' },
  { value: 1, name: 'timeStart.1' },
  { value: 2, name: 'timeStart.2' },
  { value: 3, name: 'timeStart.3' },
  { value: 4, name: 'timeStart.4' },
  { value: 5, name: 'timeStart.5' },
  { value: 6, name: 'timeStart.6' },
];

export const flightPlanStatuses = [
  { value: 'STATUS_PLAN_CREATED', name: 'flightPlan.status.STATUS_PLAN_CREATED' },
  { value: 'STATUS_PLAN_SENT', name: 'flightPlan.status.STATUS_PLAN_SENT' },
  { value: 'STATUS_PLAN_APPROVED', name: 'flightPlan.status.STATUS_PLAN_APPROVED' },
  { value: 'STATUS_PLAN_REJECTED', name: 'flightPlan.status.STATUS_PLAN_REJECTED' },
  { value: 'STATUS_PLAN_CANCELED', name: 'flightPlan.status.STATUS_PLAN_CANCELED' },
  {
    value: 'STATUS_PLAN_SENT_APPROVAL_SUPER_CENTER',
    name: 'flightPlan.status.STATUS_PLAN_SENT_APPROVAL_SUPER_CENTER',
  },
];

export enum FlightPlanStatus {
  Created = 'STATUS_PLAN_CREATED',
  Sent = 'STATUS_PLAN_SENT',
  Approved = 'STATUS_PLAN_APPROVED',
  Rejected = 'STATUS_PLAN_REJECTED',
  Canceled = 'STATUS_PLAN_CANCELED',
  StatusPlanSentApprovalSuperCenter = 'STATUS_PLAN_SENT_APPROVAL_SUPER_CENTER',
}

export enum FlightRouteContextType {
  Default = 'default',
  Waypoint = 'waypoint',
  WaypointTurn = 'waypoint-turn',
  FlightRoutePart = 'flight-route-part',
}

export enum FlightState {
  Passive = 'PASSIVE',
  Active = 'ACTIVE',
  Done = 'DONE',
  Cancelled = 'CANCELLED',
}

export const flightStates = [
  { value: 'PASSIVE', name: 'flightState.PASSIVE' },
  { value: 'ACTIVE', name: 'flightState.ACTIVE' },
  { value: 'DONE', name: 'flightState.DONE' },
  { value: 'CANCELLED', name: 'flightState.CANCELLED' },
];

export enum SidebarTab {
  Track = 'track',
  FlightOperator = 'flightOperator',
  FlightRoute = 'flightRoute',
  Flight = 'flight',
  FlightPlan = 'flightPlan',
  MilitaryTraining = 'militaryTraining',
  Meteorology = 'meteorology',
  Report = 'report',
  Exchange = 'exchange',
  Category = 'category',
  Pilot = 'pilot',
  Exercise = 'exercise',
  Aircraft = 'aircraft',
  AircraftType = 'aircraftType',
  Airport = 'airport',
  Milestone = 'milestone',
  FlightCorridor = 'flightCorridor',
  Beacon = 'beacon',
  WeatherZone = 'weatherZone',
  ConnectionManage = 'menu.connection.management',
  Record = 'record',
  GroupTrack = 'groupTrack',
  Statistic = 'statistic',
  Session = 'session',
  MilitaryGrid = 'militaryGrid',
  Setting = 'system.setting',
  ChatManage = 'chatManage',
}

export enum FriendFoeState {
  Unknown = 0,
  Ally = 1,
  Neutral = 2,
  Enemy = 3,
  Threat = 4,
  OnwForce = 5,
  All = 6,
}

export enum AreaUnit {
  UnitKM2 = 'km2',
  UnitM2 = 'm2',
  UnitNM2 = 'nm2',
}

export enum LengthUnit {
  UnitKM = 'km',
  UnitM = 'm',
  UnitNM = 'nm',
}

export enum SpeedUnit {
  UnitKPH = 'kph',
  UnitKnot = 'knot',
  UnitMPS = 'mps',
}

export enum TrackingMode {
  AUTOMATIC = 0,
  SEMI_AUTO = 1,
  MANUAL = 2,
}

export enum ActiveMode {
  TENTATIVE = 0,
  POTENTIAL = 1,
  ACTIVE = 2,
}

export enum Groups {
  RADAR = 1,
  AIS = 2,
  INTELLIGENCE = 3,
  NRC = 4,
  AFAD = 5,
  SUBMARINE = 6,
  WARFARE = 7,
  VQ1M = 8,
  VQ2 = 9,
  ELECTRONIC_WARFARE = 10,
  MILITARY = 11,
}

export enum TypeFlightPlan {
  Civilian = 'CIVILIAN',
  Military = 'MILITARY',
}

export const UnitRanks = [
  { value: 0, name: 'unitRank.0' },
  { value: 10, name: 'unitRank.10' },
  { value: 30, name: 'unitRank.30' },
  { value: 50, name: 'unitRank.50' },
  { value: 100, name: 'unitRank.100' },
];
