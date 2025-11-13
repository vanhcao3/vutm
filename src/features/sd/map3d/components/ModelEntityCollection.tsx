import { Entity, PointGraphics } from "resium";
import { ModelEntity } from "./ModelEntity";

export interface EntityData {
     url: any;
     position: any;
     color?: any;
}
interface ModelEntityCollectionProps {
     data: EntityData[];
     onEntityClick?: any;
}
export const ModelEntityCollection = ({ data, onEntityClick }: ModelEntityCollectionProps) => {
     return (
          <>
               {data.map((item, idx) => {
                    return (
                         <ModelEntity
                              key={idx}
                              url={item.url}
                              position={item.position}
                              color={item.color}
                              onModelClick={() => onEntityClick(item)}
                         />
                    );
               })}
          </>
     );
};
