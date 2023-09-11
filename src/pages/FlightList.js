import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAirportsContext } from "../context/AirportHook";
import { RxCaretSort, RxCaretDown, RxCaretUp } from "react-icons/rx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import axios from "axios";
import ResultComponent from "../components/ResultComponent";

const List = () => {
//sorting
  const [departureDateSort, setDepartureDateSort] = useState("");
  const [departurePriceSort, setDeparturePriceSort] = useState("");
  const [returnDateSort, setReturnDateSort] = useState("");
  const [returnPriceSort, setReturnPriceSort] = useState("");
  const [departureFlightsLoading, setDepartureFlightsLoading] = useState(false);
  const [returnFlightsLoading, setReturnFlightsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);

  const [airportTo, setAirportTo] = useState("");
  const [airportFrom, setAirportFrom] = useState("");

  const { airports } = useAirportsContext();

  const setAirportsName = (from, to) => {
    if (
      searchParams.get("airportFrom") &&
      searchParams.get("airportTo") &&
      searchParams.get("departureDate")
    ) {
      setAirportFrom(
        airports.filter((airport) => airport.value === from)[0].label
      );
      setAirportTo(airports.filter((airport) => airport.value === to)[0].label);
    }
  };

  const getDepartureFlights = async (from, to, departureDate) => {
    let querySortAddition = "";
    if (departureDateSort) {
      querySortAddition += "&_sort=d_time&_order=" + departureDateSort;
    }
    if (departurePriceSort) {
      querySortAddition += "&_sort=price&_order=" + departurePriceSort;
    }
    let response;
    try {
      response = await axios.get(
        `http://localhost:5000/flights?from_code=${from}&to_code=${to}&date=${departureDate}` +
          querySortAddition
      );
      if (response.data) {
        setDepartureFlights(response.data);
      }
    } catch (err) {
      console.log(err);
    }
    setDepartureFlightsLoading(false);
  };

  const getReturnFlights = async (from, to, returnDate) => {
    let querySortAddition = "";
    if (returnDateSort) {
      querySortAddition += "&_sort=d_time&_order=" + returnDateSort;
    }
    if (returnPriceSort) {
      querySortAddition += "&_sort=price&_order=" + returnPriceSort;
    }
    let response;
    try {
      response = await axios.get(
        `http://localhost:5000/flights?from_code=${from}&to_code=${to}&date=${returnDate}` +
          querySortAddition
      );
      if (response.data) {
        setReturnFlights(response.data);
      }
    } catch (err) {
      console.log(err);
    }
    setReturnFlightsLoading(false);
  };

  useEffect(() => {
    const from = searchParams.get("airportFrom");
    const to = searchParams.get("airportTo");
    const departureDate = searchParams.get("departureDate");
    const returnDate = searchParams.get("returnDate");

    if (airports) {
      setAirportsName(from, to);
    }
    if (departureDate) {
      setDepartureFlightsLoading(true);
      getDepartureFlights(from, to, departureDate);
    }

    if (returnDate) {
      setReturnFlightsLoading(true);
      getReturnFlights(to, from, returnDate);
    }
  }, []);

  useEffect(() => {
    if (airports && !airportTo && !airportFrom) {
      setAirportsName(
        searchParams.get("airportFrom"),
        searchParams.get("airportTo")
      );
    }
  }, [airports]);

  useEffect(() => {
    const from = searchParams.get("airportFrom");
    const to = searchParams.get("airportTo");
    const departureDate = searchParams.get("departureDate");
    getDepartureFlights(from, to, departureDate);
  }, [departureDateSort, departurePriceSort]);

  useEffect(() => {
    const from = searchParams.get("airportFrom");
    const to = searchParams.get("airportTo");
    const returnDate = searchParams.get("returnDate");
    getReturnFlights(to, from, returnDate);
  }, [returnDateSort, returnPriceSort]);

  const onDepartureDateSortClick = () => {
    if (!departureDateSort || departureDateSort === "desc") {
      setDepartureDateSort("asc");
      setDeparturePriceSort("");
    } else {
      setDepartureDateSort("desc");
      setDeparturePriceSort("");
    }
  };

  const onDeparturePriceSortClick = () => {
    if (!departurePriceSort || departurePriceSort === "desc") {
      setDeparturePriceSort("asc");
      setDepartureDateSort("");
    } else {
      setDeparturePriceSort("desc");
      setDepartureDateSort("");
    }
  };

  const onReturnDateSortClick = () => {
    if (!returnDateSort || returnDateSort === "desc") {
      setReturnDateSort("asc");
      setReturnPriceSort("");
    } else {
      setReturnDateSort("desc");
      setReturnPriceSort("");
    }
  };

  const onReturnPriceSortClick = () => {
    if (!returnPriceSort || returnPriceSort === "desc") {
      setReturnPriceSort("asc");
      setReturnDateSort("");
    } else {
      setReturnPriceSort("desc");
      setReturnDateSort("");
    }
  };

  return (
    <div className="listpage-wrapper">
      {searchParams.get("airportFrom") &&
      searchParams.get("airportTo") &&
      searchParams.get("departureDate") ? (
        <>
          <div className="list-wrapper">
            <div className="search-settings">
             FROM{" "}
              <span className="text-bold">{airportFrom}</span> TO{" "}
              <span className="text-bold">{airportTo}</span> at
              <span className="text-bold">
                {" "}
                {searchParams.get("departureDate")}
              </span>
            </div>
            <div className="sort-bar">
              <div className="sort-child"></div>
              <div className="sort-text">
                SORT:
                </div>
              <div
                className="sort-child active"
                onClick={onDepartureDateSortClick}
              >
                {!departureDateSort ? (
                  <RxCaretSort style={{ transform: "scale(3)" }} />
                ) : departureDateSort === "asc" ? (
                  <RxCaretUp style={{ transform: "scale(3)" }} />
                ) : departureDateSort === "desc" ? (
                  <RxCaretDown style={{ transform: "scale(3)" }} />
                ) : (
                  <></>
                )}
              </div>
              <div className="sort-text">
                SORT FOR PRICE:
                </div>
              <div
                className="sort-child active"
                onClick={onDeparturePriceSortClick}
              >
                {!departurePriceSort ? (
                  <RxCaretSort style={{ transform: "scale(3)" }} />
                ) : departurePriceSort === "asc" ? (
                  <RxCaretUp style={{ transform: "scale(3)" }} />
                ) : departurePriceSort === "desc" ? (
                  <RxCaretDown style={{ transform: "scale(3)" }} />
                ) : (
                  <></>
                )}
              </div>
              <div className="sort-child"></div>
            </div>
            {!departureFlightsLoading ? (
              <>
                {departureFlights.map((flight) => (
                  <ResultComponent key={flight.id} flight={flight} />
                ))}
              </>
            ) : (
              <AiOutlineLoading3Quarters />
            )}
            {!departureFlightsLoading && departureFlights.length < 1 && (
              <p className="no-data-text">
                There is no flight
              </p>
            )}
          </div>
          {searchParams.get("returnDate") && (
            <div className="list-wrapper">
              <div className="search-settings">
                FROM{" "}
                <span className="text-bold">{airportTo}</span> TO{" "}
                <span className="text-bold">{airportFrom}</span> at
                <span className="text-bold">
                  {" "}
                  {searchParams.get("returnDate")}
                </span>
              </div>
              <div className="sort-bar">
                <div className="sort-child"></div>
                <div className="sort-text">
                SORT:
                </div>
                <div
                  className="sort-child active"
                  
                  onClick={onReturnDateSortClick}
                >
                    {!returnDateSort ? (
                    <RxCaretSort style={{ transform: "scale(3)" }} />
                  ) : returnDateSort === "asc" ? (
                    <RxCaretUp style={{ transform: "scale(3)" }} />
                  ) : returnDateSort === "desc" ? (
                    <RxCaretDown style={{ transform: "scale(3)" }} />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="sort-text">
                SORT FOR PRICE:
                </div>
                <div
                  className="sort-child active"
                  onClick={onReturnPriceSortClick}
                >
                  {!returnPriceSort ? (
                    <RxCaretSort style={{ transform: "scale(3)" }} />
                  ) : returnPriceSort === "asc" ? (
                    <RxCaretUp style={{ transform: "scale(3)" }} />
                  ) : returnPriceSort === "desc" ? (
                    <RxCaretDown style={{ transform: "scale(3)" }} />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="sort-child"></div>
              </div>
              {!returnFlightsLoading ? (
                <>
                  {returnFlights.map((flight) => (
                    <ResultComponent key={flight.id} flight={flight} />
                  ))}
                </>
              ) : (
                <AiOutlineLoading3Quarters />
              )}
              {!returnFlightsLoading && returnFlights.length < 1 && (
                <p className="no-data-text">
                 There is no flight
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <h1 className="header" style={{ paddingBottom: "15%" }}>
          {"ERROR :("}
        </h1>
      )}
    </div>
  );
};

export default List;
