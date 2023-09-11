import { useEffect, useState } from "react";
import PegasusLogo from "../assets/pegasus.png";
import ThyLogo from "../assets/THY.PNG";
import IberiaLogo from "../assets/Iberia-logo.png";
import SasLogo from "../assets/sas.png";
import AirFranceLogo from "../assets/Air-France-Logo.png";
import LufthansaLogo from "../assets/Lufthansa.png";

const confirmAlert = () => {
  alert('CONFIRMED!');
}

const ResultComponent = ({ flight }) => {
  const [duration, setDuration] = useState("");


  useEffect(() => {
    //calculations for duration time
    const d_timeHours = Number(flight.d_time.split(":")[0]);
    const d_timeMinutes = Number(flight.d_time.split(":")[1]);

    const a_timeHours = Number(flight.a_time.split(":")[0]);
    const a_timeMinutes = Number(flight.a_time.split(":")[1]);

    const d_time = d_timeHours * 60 + d_timeMinutes;
    const a_time = a_timeHours * 60 + a_timeMinutes;

    let timeDifferenceInMinutes;

    if (d_time > a_time) {
      timeDifferenceInMinutes = 24 * 60 - d_time + a_time;
    } else {
      timeDifferenceInMinutes = a_time - d_time;
    }

    const hoursDifference = Math.floor(timeDifferenceInMinutes / 60);
    const minutesDifference = timeDifferenceInMinutes % 60;

    setDuration(`${hoursDifference} h ${minutesDifference} min`);
  }, []);
  return (
    <div className="flight-elem">
      <div className="flight-elem-child airline">
        <div className="logo">
          <img
            src={
              flight.airline_code == "THY"
                ? ThyLogo
                : flight.airline_code === "PGT"
                ? PegasusLogo
                : flight.airline_code === "IBE"
                ? IberiaLogo
                : flight.airline_code === "LF"
                ? LufthansaLogo
                : flight.airline_code === "AF"
                ? AirFranceLogo
                : flight.airline_code === "SAS"
                ? SasLogo
                : null
            }
            alt="airline logo"
          />
        </div>
        <span className="airline-name">{flight.airline}</span>
        <div>({flight.number})</div>
        
      </div>
      <div className="flight-elem-child duration-elem">
        <div className="from-side">
          <div className="d_time">{flight.d_time}</div>
          <div className="from-short">{flight.from_code}</div>
        </div>
        <div className="duration-side">
          <div>{duration}</div>
          <div className="line"></div>
        </div>
        <div className="to-side">
          <div className="a_time">{flight.a_time}</div>
          <div className="to-short">{flight.to_code}</div>
        </div>
      </div>
      <div className="flight-elem-child price-elem">
        <div className="price">{flight.price}</div>
        <span>TRY</span>
      </div>
      <div className="flight-elem-child">
      <button onClick={confirmAlert}>Continue</button>
      </div>
    </div>
  );
};

export default ResultComponent;
