import { useMemo } from "react";
import { Entity, PolygonGraphics } from "resium";

interface PolygonEntityProps {
     coords: any;
     color: any;
     alpha: number;
     show: boolean;
     onPolygonClick?: any;
}
export const PolygonEntity = ({
     coords,
     alpha,
     color,
     show,
     onPolygonClick,
}: PolygonEntityProps) => {
     const cesiumColor = useMemo(() => {
          return Cesium.Color.fromCssColorString(color).withAlpha(alpha);
     }, [color]);
     return (
          <Entity onClick={() => onPolygonClick()}>
               <PolygonGraphics show={show} material={cesiumColor} fill={true} hierarchy={coords} />
          </Entity>
     );
};
