import { Entity, PointGraphics } from "resium";

interface PointEntityProps {
     position: any;
     onEntityClick?: any;
}
export const PointEntity = ({ position, onEntityClick }: PointEntityProps) => {
     return (
          <Entity position={position} onClick={() => onEntityClick()}>
               <PointGraphics pixelSize={10} />
          </Entity>
     );
};
