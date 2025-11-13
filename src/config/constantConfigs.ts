import { FriendFoeState, TargetType } from "./enum";

export const MAPBOX_TOKEN = "invalid token";
export const FRIEND_FOE_STATES = [
     { label: "friendFoeState.Unknown", code: FriendFoeState.Unknown, color: "#E09B03" },
     { label: "friendFoeState.Ally", code: FriendFoeState.Ally, color: "#CC0000" },
     { label: "friendFoeState.Neutral", code: FriendFoeState.Neutral, color: "#DC00E2" },
     { label: "friendFoeState.Enemy", code: FriendFoeState.Enemy, color: "#0000FF" },
     { label: "friendFoeState.Threat", code: FriendFoeState.Threat, color: "#289628" },
     { label: "friendFoeState.OnwForce", code: FriendFoeState.OnwForce, color: "#800000" },
];

export const TRACK_FREQUENCY_BOUNDARY = 30000;

export const TARGET_TYPE_OPTIONS: { name: string; value: number }[] = [
     { name: "trackType.0", value: TargetType.Unknown },
     { name: "trackType.1", value: TargetType.Aircraft },
     { name: "trackType.2", value: TargetType.Vessel },
];
