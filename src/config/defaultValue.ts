import { ActiveMode, EwType, Groups, TargetType, TrackingMode } from "./enum";

// eslint-disable-next-line no-restricted-imports
import { Track } from "@/features/sd/map2d/components/TrackLayer/types";

export const initialTrack: Track = {
     groups: [Groups.AFAD],
     targetType: TargetType.Aircraft,
     trackingMode: TrackingMode.MANUAL,
     activeMode: ActiveMode.POTENTIAL,
     geodeticPosition: {
          longitude: 0,
          latitude: 0,
          altitude: 0,
     },
     polarVelocity: {
          heading: 0,
          speed: 0,
     },
     afadInfo: {
          trackNumber: 0,
          trackQuality: 0,
          note: "",
          airRoute: "",
          tailNumber: "",
          trackAttribute: "",
     },
     ewInfo: {
          ewType: EwType.Unknown,
          frequency: 0,
          startTimestamp: 0,
          detectionDuration: 0,
          note: "",
          elintRadarInfo: {
               pulseWidth: 0,
               repeatedInterval: 0,
               radarType: "",
          },
          elintTargetInfo: {
               radarName: "",
               radarType: "",
               elintObjectType: "",
               ewAircraftType: "",
               ewAircraftModel: "",
               operationMode: 0,
               jammingStatus: 0,
               verificationResult: 0,
          },
          comintTargetInfo: {
               modulation: "",
               bandwidth: 0,
               comintObjectType: "",
               targetType: "",
               communicationProperty: "",
               operationMode: 0,
               jammingStatus: 0,
               verificationResult: 0,
          },
          indirectComintTargetInfo: {
               modulation: "",
               comintObjectType: "",
               targetType: "",
          },
     },
     trackInfo: {
          name: "",
          callSign: "",
          countryCode: "",
          friendFoeState: 0,
          departureLocation: "",
          arrivalLocation: "",
          mmsi: 0,
          aircraftInfo: {
               mode3a: "",
               modeS: "",
               aircraftType: 0,
               aircraftCount: 0,
               specialLabel: "",
          },
          vesselInfo: {
               imoNumber: 0,
               vesselType: 0,
               vesselOperation: 0,
          },
     },
};
