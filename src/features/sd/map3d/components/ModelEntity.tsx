import { Transforms } from "cesium";
import { useMemo } from "react";
import { Model } from "resium";

interface ModelEntityProps {
     position: any;
     url: string;
     color?: any;
     onModelClick?: any;
}
export const ModelEntity = ({ position, color, url, onModelClick }: ModelEntityProps) => {
     const modelMatrix = Transforms.eastNorthUpToFixedFrame(position);
     const cesiumColor = useMemo(() => {
          return Cesium.Color.fromCssColorString(color);
     }, [color]);
     return (
          <Model
               url={url}
               color={cesiumColor}
               modelMatrix={modelMatrix}
               minimumPixelSize={128}
               maximumScale={5000}
               //    onReady={() => console.log("model ready", position)}
               onClick={() => onModelClick()}
          />
     );
};
