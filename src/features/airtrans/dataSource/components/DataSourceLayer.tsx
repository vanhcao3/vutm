import { useEffect, useState } from "react";
import { DataSource } from "../types";
import { getAllDataSource } from "../api/dataSourceService";
import * as turf from "@turf/turf";
import { Layer, Source } from "react-map-gl";
import { RootState } from "@/slices";
import { useSelector, useDispatch } from "react-redux";

export const DataSourceLayer = () => {
     const dataSourceList = useSelector((state: RootState) => state.dataSource.dataSourceList);
     const [sourceDraw, setSourceDraw] = useState<any>(turf.featureCollection([]));
     const [opacity, setOpacity] = useState(1);

     useEffect(() => {
          const features: Array<any> = [];

          dataSourceList.forEach((dataSourceInfo) => {
               if (dataSourceInfo.is_display === false) return;
               const { position, coverage } = dataSourceInfo;
               features.push(
                    turf.circle(position, coverage, {
                         units: "kilometers",
                         properties: { type: "coverage" },
                    })
               );
               features.push(
                    turf.point(position, {
                         type: "data_source_pos",
                         name: dataSourceInfo.datasource_add,
                         offset: [0, dataSourceInfo.connection_type],
                    })
               );
          });
          setSourceDraw(turf.featureCollection(features));
     }, [dataSourceList]);

     useEffect(() => {
          const interval = setInterval(() => {
               setOpacity((prev) => (prev === 1 ? 0 : 1));
          }, 500);
          return () => clearInterval(interval);
     }, []);

     return (
          <>
               <Source type="geojson" data={sourceDraw}>
                    <Layer
                         type="fill"
                         filter={["==", "type", "coverage"]}
                         paint={{ "fill-color": "orange", "fill-opacity": 0.2 }}
                    />
                    <Layer
                         type="circle"
                         filter={["==", "type", "data_source_pos"]}
                         paint={{
                              "circle-radius": 5,
                              "circle-color": "green",
                              "circle-opacity": opacity,
                         }}
                    />
                    <Layer
                         type="symbol"
                         filter={["==", "type", "data_source_pos"]}
                         layout={{
                              "text-field": ["get", "name"],
                              "text-size": 15,
                              "text-offset": ["get", "offset"],
                              "text-variable-anchor": ["top"],
                              "text-allow-overlap": true,
                         }}
                    />
               </Source>
          </>
     );
};
