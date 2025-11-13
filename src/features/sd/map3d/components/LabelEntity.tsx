import { useMemo } from "react";
import { Entity, LabelGraphics, PointGraphics } from "resium";

interface LabelEntityProps {
     position: any;
     color: any;
     text: string;
     onLabelClick?: any;
}
export const LabelEntity = ({ position, text, color, onLabelClick }: LabelEntityProps) => {
     const cesiumColor = useMemo(() => {
          return Cesium.Color.fromCssColorString(color);
     }, [color]);
     return (
          <Entity position={position} onClick={() => onLabelClick()}>
               <LabelGraphics
                    fillColor={cesiumColor}
                    text={text}
                    font={"Roboto Medium 14px"}
                    horizontalOrigin={Cesium.HorizontalOrigin.CENTER}
                    verticalOrigin={Cesium.VerticalOrigin.TOP}
                    disableDepthTestDistance={2000000}
               />
          </Entity>
     );
};
