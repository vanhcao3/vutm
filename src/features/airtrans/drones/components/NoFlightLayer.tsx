import * as turf from "@turf/turf";
import { useEffect, useState } from "react";
import { Layer, Source } from "react-map-gl";

const NO_FLY_ZONE_1 = [
     [105.51837159033283, 21.008639316580528],
     [105.52142612987979, 21.009250349595447],
     [105.5211643122031, 21.007457978987574],
     [105.52465521454269, 21.002528848796473],
     [105.52561521268689, 20.998903186309548],
     [105.52718611873979, 20.995684827849445],
     [105.53024065828663, 20.990755308861438],
     [105.5248297596604, 20.990592346777305],
     [105.521818856393, 21.000532708436197],
     [105.51828431777392, 21.006439577004315],
     [105.51828431777392, 21.008598580957],
     [105.51837159033283, 21.008639316580528],
];

const NO_FLY_ZONE_2 = [
     [105.51918939876481, 20.990310978445876],
     [105.50744453507798, 20.98953694210158],
     [105.5009503163327, 20.989956212285875],
     [105.49597602112345, 20.99140752306522],
     [105.49452518502119, 21.007177523929613],
     [105.51483689045807, 21.008370687268567],
     [105.51863669929736, 20.990472235512613],
     [105.51918939876481, 20.990310978445876],
];

const NO_FLY_ZONES = [NO_FLY_ZONE_1, NO_FLY_ZONE_2];

export const NoFlightLayer = () => {
     const [sourceDraw, setSourceDraw] = useState<any>(turf.featureCollection([]));

     useEffect(() => {
          const polygonFeatures: any[] = [];

          NO_FLY_ZONES.forEach((area) => {
               polygonFeatures.push(turf.polygon([area]));
          });

          setSourceDraw(turf.featureCollection(polygonFeatures));
     }, [NO_FLY_ZONES]);

     return (
          <>
               <Source type="geojson" data={sourceDraw}>
                    <Layer
                         type="fill"
                         paint={{
                              "fill-color": "red",
                              "fill-opacity": 0.1,
                         }}
                    />

                    <Layer type="line" paint={{ "line-dasharray": [3, 2], "line-color": "red" }} />
               </Source>
          </>
     );
};
