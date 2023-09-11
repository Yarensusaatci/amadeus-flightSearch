import { useContext } from "react";
import { AirportsContext } from "./FetchAirport";

export const useAirportsContext = () => {
  const context = useContext(AirportsContext);
  if (!context) {
    throw new Error("useAirportsContext must be inside a provider");
  }
  return context;
};