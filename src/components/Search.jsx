import React, { useContext, useEffect, useRef, useState } from "react";
import { LocationContext } from "./context/locationContext";
const CAGE_API = import.meta.env.VITE_OPENCAGE_API_KEY;
const Search = () => {
  const [input, setInput] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [data, setData] = useState([]);
  const { setLocationData, locationData, setPosition } =
    useContext(LocationContext);

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const clickHandler = (e) => {
    const loc = data[e.target.id];
    setLocationData(loc);
    setPosition(loc.geometry);
    setInputFocus(false);
    e.target.blur();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (data[0]) {
      setLocationData(data[0]);
      setInput(data[0].formatted);
    }
    setPosition(data[0].geometry);

    setInputFocus(false);
    e.target[0].blur();
  };
  const address = input;
  useEffect(() => {
    const getData = async () => {
      if (address != "") {
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${CAGE_API}`
          );
          const result = await response.json();
          setData(result.results);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    getData();
  }, [input]);
  return (
    <>
      <div className="text-center">
        <form onSubmit={submitHandler} className="" action="">
          <input
            onFocus={() => setInputFocus(true)}
            className="w-[90%] rounded-2xl p-2 bg-slate-200 dark:bg-slate-600 dark:text-white"
            onChange={changeHandler}
            value={input}
            type="text"
            placeholder="search your location"
          />
        </form>
        <div className="absolute top-[122px] left-[7.5%] xl:left-90 z-[1500] bg-slate-300 dark:bg-slate-800 rounded-xl p-1 text-left pl-1 w-[85%]">
          {data &&
            inputFocus &&
            data.map((loc, i) => (
              <h1
                className="dark:text-white hover:bg-slate-200 dark:hover:bg-slate-500 p-1 text-sm rounded-[8px]"
                onClick={clickHandler}
                key={i}
                id={i}
              >
                {loc.formatted}
              </h1>
            ))}
        </div>
      </div>
    </>
  );
};

export default Search;
