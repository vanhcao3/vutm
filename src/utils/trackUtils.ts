import { FRIEND_FOE_STATES, TRACK_FREQUENCY_BOUNDARY } from "@/config/constantConfigs";
import { ActiveMode, EwType, TargetType, TrackImage } from "@/config/enum";
// eslint-disable-next-line no-restricted-imports
import { Track } from "@/features/sd/map2d/components/TrackLayer/types";

export const getTrackColor = (idx: number) => {
     return FRIEND_FOE_STATES[idx]?.color || "#E09B03";
};

// eslint-disable-next-line import/no-anonymous-default-export
export const getTrackImage = (track: Track) => {
     if (track.activeMode !== ActiveMode.ACTIVE && !track.ewInfo) {
          return TrackImage.UnconfirmTrack;
     } else {
          switch (track.targetType) {
               case TargetType.Unknown: {
                    if (!track.ewInfo) return TrackImage.UnknownTrack;

                    const { ewType } = track.ewInfo;
                    switch (ewType) {
                         case EwType.ElintRadar:
                              return TrackImage.ElintRadar;
                         case EwType.ElintTarget:
                              return TrackImage.AircraftTrack;
                         case EwType.ComintTarget:
                         case EwType.IndirectComintTarget:
                              // eslint-disable-next-line no-case-declarations
                              const frequency = track.ewInfo?.frequency || 0;
                              if (frequency >= TRACK_FREQUENCY_BOUNDARY) {
                                   return TrackImage.HighComint;
                              } else {
                                   return TrackImage.LowComint;
                              }
                         default:
                              return TrackImage.AircraftTrack;
                    }
               }
               case TargetType.Aircraft:
                    return TrackImage.AircraftTrack;
               case TargetType.Vessel:
                    return TrackImage.VesselTrack;
               case TargetType.GroundVehicle:
                    return TrackImage.GroundTrack;
               default:
                    return TrackImage.AircraftTrack;
          }
     }
};
