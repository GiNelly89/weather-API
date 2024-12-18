import React from "react";
import buttonImg from "../assets/button.svg";
import mapArray from "./Skins";
import { useState, useContext } from "react";
import { LocationContext } from "./context/locationContext";

const SkinChange = () => {
  const contextData = useContext(LocationContext);
  const { map, setMap } = contextData;

  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      <button
        className="absolute z-[1000] top-[144px] right-[30px]  p-1 rounded-lg w-[42px] drop-shadow-xl border-solid border-black hover:hue-rotate-180 hover:rotate-180"
        onClick={() => setDropDown(!dropDown)}
      >
        <img src={buttonImg} alt="" />
      </button>
      {dropDown ? (
        <div className="absolute z-[1000] top-[190px] right-[30px] flex flex-col ">
          {mapArray.map((map, i) => (
            <button
              key={i}
              onClick={() => {
                setMap(i);
                setDropDown(false);
              }}
              className="bg-slate-300 dark:bg-slate-400 hover:bg-slate-200 p-1 mb-2 rounded-lg dark:text-white"
            >
              {map.name}
            </button>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default SkinChange;
