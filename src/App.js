// Yaren Su Saatçı
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FlightList from "./pages/FlightList";

import { useAirportsContext } from "./context/AirportHook";
import { useEffect } from "react";

function App() {
  const { fetchAirports } = useAirportsContext();

  useEffect(() => {
    fetchAirports();
  }, []);

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<FlightList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
