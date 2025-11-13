import { Camera, CameraFlyTo, Viewer, Scene, ImageryLayer } from "resium";
import { Cartesian3 } from "cesium";
import { createMRTWithStyle } from "../assets/script/tile/imageryproviders/mrt";
import { useEffect, useState } from "react";
import { createMVTWithStyle } from "../assets/script/tile/imageryproviders/mvt";
import { PointEntity } from "./PointEntity";
import { Button as MUIButton } from "@mui/material";
import { ModelEntity } from "./ModelEntity";
import { ModelEntityCollection } from "./ModelEntityCollection";
import { PolyLineEntity } from "./PolylineEntity";
import { PolygonEntity } from "./PolygonEntity";
import { LabelEntity } from "./LabelEntity";

const TILE_GATEWAY_URL = "http://dev.c4i.vn";
const ranhgioiLayer = createMVTWithStyle({
     layer: "ranhgioi",
     url: TILE_GATEWAY_URL + "/tiles/data/ranhgioi/{z}/{x}/{y}.pbf",
     key: "",
     style: {
          type: "line",
          paint: {
               "line-color": "#ffa600",
               "line-opacity": 1,
               "line-width": 2,
               "line-dasharray": [1, 3],
          },
     },
     styleUrl: "",
});
const providerViewModels = [];
// ban do openstreetmap
let vietNamBaseLayer = new Cesium.WebMapTileServiceImageryProvider({
     url: TILE_GATEWAY_URL + "/tiles/styles/basic/{TileMatrix}/{TileCol}/{TileRow}.png",
     layer: "basic",
     style: "default",
     format: "image/png",
     tileMatrixSetID: "default028mm",
     maximumLevel: 20,
     credit: new Cesium.Credit("nen ve tinh"),
});
let roadMapProvider = new Cesium.ProviderViewModel({
     id: "roadmap",
     name: "Nền giao thông",
     iconUrl: Cesium.buildModuleUrl("Widgets/Images/ImageryProviders/esriWorldStreetMap.png"),
     tooltip: "Nền giao thông",
     creationFunction: function () {
          return vietNamBaseLayer;
     },
});
providerViewModels.push(roadMapProvider);
// ban do ve tinh
let satelliteLayer = createMRTWithStyle(Cesium, {
     url: TILE_GATEWAY_URL + "/tiles/data/{k}/{z}/{x}/{y}.png",
     key: "",
     styleUrl: TILE_GATEWAY_URL + "/tiles/proxy/style_stl.json?host=" + TILE_GATEWAY_URL,
});

let satelliteProvider = new Cesium.ProviderViewModel({
     id: "satellite",
     name: "Nền vệ tinh",
     iconUrl: Cesium.buildModuleUrl("Widgets/Images/ImageryProviders/mapboxSatellite.png"),
     tooltip: "Nền vệ tinh",
     creationFunction: function () {
          return satelliteLayer;
     },
});
providerViewModels.push(satelliteProvider);
//bản đồ nền topo
let topoLayer = createMRTWithStyle(Cesium, {
     url: TILE_GATEWAY_URL + "/tiles/data/{k}/{z}/{x}/{y}.png",
     key: "",
     styleUrl: TILE_GATEWAY_URL + "/tiles/proxy/style_topo.json?host=" + TILE_GATEWAY_URL,
});

let topoProvider = new Cesium.ProviderViewModel({
     name: "Nền topo",
     iconUrl: "/topo.png",
     tooltip: "Nền topo",
     creationFunction: function () {
          return topoLayer;
     },
});
providerViewModels.push(topoProvider);
//bản đồ nhiệt
let heatMapLayer = createMRTWithStyle(Cesium, {
     url: TILE_GATEWAY_URL + "/tiles/data/{k}/{z}/{x}/{y}.png",
     key: "",
     styleUrl: TILE_GATEWAY_URL + "/tiles/proxy/style_hm.json?host=" + TILE_GATEWAY_URL,
});

let heatMapProvider = new Cesium.ProviderViewModel({
     name: "Bản đồ nhiệt",
     id: "heatmap",
     iconUrl: Cesium.buildModuleUrl("/heatmap.png"),
     tooltip: "Bản đồ nhiệt",
     creationFunction: function () {
          return heatMapLayer;
     },
});
providerViewModels.push(heatMapProvider);
const terrainModels = [];
// imagerylayer
// const tms : any = new UrlTemplateImageryProvider({
//     url: 'http://dev.c4i.vn/tiles/styles/basic/{z}/{x}/{y}.png',
// })
const terrainProvider = new Cesium.CesiumTerrainProvider({
     url: TILE_GATEWAY_URL + `/dem/tilesets/dem90m`,
     requestVertexNormals: true,
});
export const Map3D = () => {
     let viewer = null;

     const [showRanhGioi, setShowRanhGioi] = useState(true);
     const [position, setPosition] = useState(Cartesian3.fromDegrees(105, 23, 100));
     const [modelPosition, setModelPosition] = useState(Cartesian3.fromDegrees(105, 23, 20000));
     const [modelColor, setModelColor] = useState("#ff0000");
     const [polylineCoords, setPolylineCoords] = useState(
          Cartesian3.fromDegreesArray([105, 23, 105, 20])
     );
     const [polygonCoords, setPolygonCoords] = useState(
          Cartesian3.fromDegreesArray([104, 21, 105, 20, 106, 20])
     );
     const [labelPosition, setLabelPosition] = useState(Cartesian3.fromDegrees(105, 23, 0));
     const randomCoords = (min, max) => {
          return Math.random() * (max - min) + min;
     };
     const randomColor = () => {
          return (
               "#" +
               Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, "0")
          );
     };
     const [modelCollectionData, setModelCollectionData] = useState([
          {
               url: "/models/gltf/Cesium_Air/128/Cesium_Air.gltf",
               position: Cartesian3.fromDegrees(
                    randomCoords(100, 105),
                    randomCoords(20, 23),
                    20000
               ),
               color: randomColor(),
          },
     ]);

     // useEffect(() => {
     // // antialias, enable if need
     //      if (viewer && viewer.scene) {
     //           viewer.scene.postProcessStages.fxaa.enabled = true;
     //      }
     // }, []);
     const testFunc = (teststr: string) => {
          switch (teststr) {
               case "change_raster":
                    // test nen ban do raster
                    viewer.baseLayerPicker.viewModel.selectedImagery = providerViewModels[1];
                    break;
               case "show_hide_vector":
                    {
                         // test an/hien lop vector
                         const newVal = !showRanhGioi;
                         setShowRanhGioi(newVal);
                    }
                    break;
               case "change_pos":
                    setPosition(Cartesian3.fromDegrees(108, 23, 100));
                    break;
               case "go_home":
                    // test set home
                    viewer.camera.setView({
                         destination: Cartesian3.fromDegrees(105, 23, 10000000),
                         orientation: {
                              heading: Cesium.Math.toRadians(-360.0), // east, default value is 0.0 (north)
                              pitch: Cesium.Math.toRadians(-90), // default value (looking down)
                              roll: 0.0, // default value
                         },
                    });
                    break;
               case "change_model_pos":
                    setModelPosition(Cartesian3.fromDegrees(108, 23, 100000));
                    break;
               case "change_model_color":
                    setModelColor("#00ff00");
                    break;
               case "change_model_collection":
                    {
                         const data = [];
                         for (let i = 0; i < 10; i++) {
                              data.push({
                                   url: "/models/gltf/Cesium_Air/128/Cesium_Air.gltf",
                                   position: Cartesian3.fromDegrees(
                                        randomCoords(100, 105),
                                        randomCoords(20, 23),
                                        20000
                                   ),
                                   color: randomColor(),
                              });
                         }
                         setModelCollectionData(data);
                    }
                    break;
               case "update_polyline":
                    setPolylineCoords(Cartesian3.fromDegreesArray([105, 23, 106, 20]));
                    break;
               default:
                    break;
          }
     };
     return (
          <>
               <Viewer
                    // imageryProvider={false}
                    terrainProvider={terrainProvider}
                    // terrainProviderViewModels={terrainModels}
                    selectedImageryProviderViewModel={providerViewModels[0]}
                    imageryProviderViewModels={providerViewModels}
                    // full
                    baseLayerPicker={true}
                    homeButton={false}
                    fullscreenButton={false}
                    vrButton={false}
                    infoBox={false}
                    navigationHelpButton={false}
                    geocoder={false}
                    timeline={false}
                    sceneModePicker={false}
                    animation={false}
                    selectionIndicator={false}
                    resolutionScale={window.devicePixelRatio}
                    ref={(e) => {
                         window["cesiumViewer"] = viewer = e && e.cesiumElement;
                    }}
               >
                    <Camera defaultZoomAmount={0} />
                    <CameraFlyTo
                         once
                         duration={0}
                         destination={Cartesian3.fromDegrees(105, 23, 1000000)}
                    />
                    <Scene debugShowFramesPerSecond></Scene>

                    <PointEntity
                         position={position}
                         onEntityClick={() => alert("Handle Point Entity Clicked")}
                    />
                    <ModelEntity
                         position={modelPosition}
                         color={modelColor}
                         url={"/models/gltf/Cesium_Air/128/Cesium_Air.gltf"}
                         onModelClick={() => alert("Handle Model Clicked")}
                    />
                    <ModelEntityCollection
                         data={modelCollectionData}
                         onEntityClick={(e) => alert("Click entity collection" + JSON.stringify(e))}
                    />
                    <PolyLineEntity
                         coords={polylineCoords}
                         width={3}
                         color="#ff0000"
                         show={true}
                         clampToGround={true}
                         onPolyLineClick={() => alert("polyline clicked")}
                    />
                    <PolygonEntity
                         coords={polygonCoords}
                         color="#00ff00"
                         alpha={0.5}
                         show={true}
                         onPolygonClick={() => alert("polygon clicked")}
                    />
                    <LabelEntity
                         position={labelPosition}
                         color={"#0000ff"}
                         text={"CESIUM TEXT"}
                         onLabelClick={() => alert("Label clicked")}
                    />
                    <ImageryLayer imageryProvider={ranhgioiLayer} show={showRanhGioi} />
               </Viewer>
               <MUIButton
                    sx={{ mx: "auto" }}
                    variant="outlined"
                    onClick={() => testFunc("go_home")}
               >
                    Go Home
               </MUIButton>
               <MUIButton
                    sx={{ mx: "auto" }}
                    variant="outlined"
                    onClick={() => testFunc("change_raster")}
               >
                    Change Raster
               </MUIButton>
               <MUIButton
                    sx={{ mx: "auto" }}
                    variant="outlined"
                    onClick={() => testFunc("show_hide_vector")}
               >
                    Show/Hide Vector
               </MUIButton>
               <MUIButton
                    sx={{ mx: "auto" }}
                    variant="outlined"
                    onClick={() => testFunc("change_pos")}
               >
                    Update Entity Pos
               </MUIButton>
               <MUIButton
                    sx={{ mx: "auto" }}
                    variant="outlined"
                    onClick={() => testFunc("change_model_pos")}
               >
                    Update Model Pos
               </MUIButton>
               <MUIButton
                    sx={{ mx: "auto" }}
                    variant="outlined"
                    onClick={() => testFunc("change_model_color")}
               >
                    Update Model Color
               </MUIButton>
               <MUIButton
                    sx={{ mx: "auto" }}
                    variant="outlined"
                    onClick={() => testFunc("change_model_collection")}
               >
                    Update Model Collection
               </MUIButton>
               <MUIButton
                    sx={{ mx: "auto" }}
                    variant="outlined"
                    onClick={() => testFunc("update_polyline")}
               >
                    Update Polyline
               </MUIButton>
          </>
     );
};
