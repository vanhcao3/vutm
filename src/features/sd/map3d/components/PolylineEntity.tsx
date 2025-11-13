import { Cartesian3 } from "cesium";
import { useMemo } from "react";
import { Entity, Polyline, PolylineCollection, PolylineGraphics } from "resium";
interface PolyLineEntityProps {
     coords: any;
     color: any;
     width: number;
     show: boolean;
     clampToGround: boolean;
     onPolyLineClick?: any;
}
export const PolyLineEntity = ({
     coords,
     color,
     width,
     show,
     clampToGround,
     onPolyLineClick,
}: PolyLineEntityProps) => {
     const cesiumColor = useMemo(() => {
          return Cesium.Color.fromCssColorString(color);
     }, [color]);
     return (
          <Entity onClick={() => onPolyLineClick()}>
               <PolylineGraphics
                    show={show}
                    width={width}
                    material={cesiumColor}
                    positions={coords}
                    clampToGround={clampToGround}
               />
          </Entity>
     );
};
