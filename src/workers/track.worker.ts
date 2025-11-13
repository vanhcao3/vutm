interface GeodeticPosition {
     longitude: number;
     latitude: number;
     altitude: number;
}

interface PolarVelocity {
     speed: number;
     heading: number;
}

interface Track {
     id: string;
     object_id: string;
     object_track_id: number;
     position: GeodeticPosition;
     created_at: number;
     updated_at: number;
     polar_velocity: PolarVelocity;
}

export const TrackWorker = () => {
     const data2hashMap = (payload: Array<any>, keyName: string) => {
          return new Map(
               payload.map((obj) => {
                    return [obj[keyName], obj];
               })
          );
     };

     const radian2Degree = (value: number) => {
          return (value * 180) / Math.PI;
     };

     const createFeature = (data: any) => {
          const listFeatures: Array<any> = [];
          data.forEach((track: any) => {
               const {
                    longitude,
                    latitude,
                    altitude,
                    speed,
                    createdTime,
                    heading,
                    mode3a,
                    trackNumber,
               } = track;
               const trackFeature = {
                    type: "Feature",
                    geometry: {
                         type: "Point",
                         coordinates: [radian2Degree(longitude), radian2Degree(latitude)],
                    },
                    properties: {
                         heading: radian2Degree(heading),
                         trackNumber,
                         color: "#15429f",
                         image: "trackSymbol",
                         altitude,
                         speed,
                         createdTime,
                         mode3a,
                    },
               };
               listFeatures.push(trackFeature);
          });

          return listFeatures;
     };
     const handleDataTracks = (payload: any) => {
          const obj = Object.entries(payload);
          const listFeatures = createFeature(payload);
          return {
               listTracksHashMap: data2hashMap(obj, "trackNumber"),
               features: {
                    type: "FeatureCollection",
                    features: listFeatures,
               },
          };
     };

     const convertTrackListToFeatures = (payload: Array<Track>) => {
          const featureList = [];
          payload.forEach((track) => {
               const { position, polar_velocity, object_track_id } = track;
               const { longitude, latitude, altitude } = position;
               const { speed = 0, heading = 0 } = polar_velocity;
               const trackFeature = {
                    type: "Feature",
                    geometry: {
                         type: "Point",
                         coordinates: [longitude, latitude],
                    },
                    properties: {
                         heading: radian2Degree(heading),
                         image: "trackSymbol",
                         altitude,
                         speed,
                         id: object_track_id,
                    },
               };

               featureList.push(trackFeature);
          });
          return featureList;
     };

     //eslint-disable-next-line no-restricted-globals
     onmessage = (event) => {
          const { cmd, payload } = event.data;

          switch (cmd) {
               case "LIST_TARGET":
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    postMessage({
                         cmd: "R_LIST_TARGET",
                         payload: handleDataTracks(payload),
                    });
                    break;
               case "UPDATE":
                    console.log("payload", payload);
                    break;
               case "LIST_TRACK":
                    postMessage({
                         cmd: "R_LIST_TRACK",
                         payload: convertTrackListToFeatures(payload),
                    });
                    break;
               default:
                    break;
          }
     };
};
