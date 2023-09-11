import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAirportsContext } from "../context/AirportHook";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import Select from "react-select";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Home = () => {
  const [airportsFrom, setAirportsFrom] = useState(null);
  const [airportsTo, setAirportsTo] = useState(null);

  const [airportTo, setAirportTo] = useState("");
  const [airportFrom, setAirportFrom] = useState("");
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(null);
  const [isOneWay, setIsOneWay] = useState(false);

  const [errors, setErrors] = useState({
    airportFrom: "",
    airportTo: "",
    departureDate: "",
    returnDate: "",
  });

  const { airports, airportsLoading } = useAirportsContext();

  const navigate = useNavigate();
  const today = dayjs();

  useEffect(() => {
    setAirportsFrom(airports);
    setAirportsTo(airports);
  }, [airports]);
// From airport and to airport cannot be same
  useEffect(() => {
   
    if (airportTo) {
      setAirportsFrom(
        airports.filter((airport) => airport.value !== airportTo)
      );
    } else {
      setAirportsFrom(airports);
    }
    if (airportFrom) {
      setAirportsTo(
        airports.filter((airport) => airport.value !== airportFrom)
      );
    } else {
      setAirportsTo(airports);
    }
  }, [airportFrom, airportTo]);

  const onButtonClick = () => {
    let anyError = false;
    let errorsHolder = {
      airportFrom: "",
      airportTo: "",
      departureDate: "",
      returnDate: "",
    };
    //validation for search inputs
    if (!airportFrom) {
      errorsHolder.airportFrom = "Select a 'From' airport.";
      anyError = true;
    }
    if (!airportTo) {
      errorsHolder.airportTo = "Select a 'To' airport.";
      anyError = true;
    }
    if (!departureDate) {
      errorsHolder.departureDate = "Select a departure date.";
      anyError = true;
    }
    if (!returnDate && !isOneWay) {
      errorsHolder.returnDate = "Select a return date.";
      anyError = true;
    }
    setErrors(errorsHolder);
    if (!anyError) {
      let formattedDepartureDate = departureDate.format("DD-MM-YYYY");
      let formattedReturnDate = "";
      if (returnDate && !isOneWay) {
        formattedReturnDate = returnDate.format("DD-MM-YYYY");
      }

      navigate(
        `/list?airportFrom=${airportFrom}&airportTo=${airportTo}&departureDate=${formattedDepartureDate}&${
          formattedReturnDate ? "returnDate=" + formattedReturnDate : ""
        }`
      );
    }
  };

  return (
    <div className="home-wrapper">
      <div className="header">TRAVEL TO FUTURE</div>
      <div className="form-wrapper">
        {airportsLoading ? (
          <div className="loading-wrapper">
            <AiOutlineLoading3Quarters />
          </div>
        ) : (
          <>
            <div className="form-child">
              <Select
                placeholder={
                  <div className="select-placeholder">
                     FROM
                  </div>
                }
                onChange={(value) => setAirportFrom(value.value)}
                options={airportsFrom}
              />
              {errors.airportFrom && (
                <span className="error">{errors.airportFrom}</span>
              )}
            </div>
            <div className="form-child">
              <Select
                placeholder={
                  <div className="select-placeholder">
                    TO
                  </div>
                }
                onChange={(value) => setAirportTo(value.value)}
                options={airportsTo}
              />
              {errors.airportTo && (
                <span className="error">{errors.airportTo}</span>
              )}
            </div>
            <div className="form-child">
              <DatePicker
                label="Departure Date"
                minDate={today}
                value={departureDate}
                onChange={(value) => setDepartureDate(value)}
                slotProps={{ textField: { size: "small" } }}
              />
              {errors.departureDate && (
                <span className="error">{errors.departureDate}</span>
              )}
            </div>
            <div className="form-child">
              <DatePicker
                label="Return Date"
                minDate={departureDate}
                value={returnDate}
                disabled={isOneWay}
                onChange={(value) => setReturnDate(value)}
                slotProps={{ textField: { size: "small" } }}
              />
              {errors.returnDate && (
                <span className="error">{errors.returnDate}</span>
              )}
            </div>
            <div className="form-child">
              <div className="radios-wrapper">
              <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="one-way"
                    name="trip-type"
                    value="One Way"
                    checked={isOneWay}
                    onChange={() => setIsOneWay(true)}
                  />
                  <label htmlFor="one-way">One Way</label>
                </div>
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="return"
                    name="trip-type"
                    value="Return"
                    checked={!isOneWay}
                    onChange={() => setIsOneWay(false)}
                  />
                  <label htmlFor="return">Return</label>
                </div>
              </div>
            </div>
            <div className="form-child"></div>
            <div className="form-child"></div>
            <div className="form-child">
              <button onClick={onButtonClick}>Search Flights</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;