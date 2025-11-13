import { RootState } from "@/slices";
import { useSelector } from "react-redux";

export const FlightCorridorLayer = () => {
     const flightCorridors = useSelector(
          (state: RootState) => state.flightCorridor.flight_corridors
     );
     console.log("flightCorridors", flightCorridors);
     return <></>;
};
