import { useEffect, useRef, useState } from "react";
import sprite from "src/assets/icons/sprite.svg";
import useStore from "../zustand/store";
import { setFilter } from "../zustand/filter/operations";

const options = [
  "A to Z",
  "Z to A",
  "Less than 10$",
  "Greater than 10$",
  "Popular",
  "Not popular",
  "Show all",
];
const Filter = () => {
  const curFilter = useStore.getState().curFilter;
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = option => {
    setFilter(option);
    setIsOpen(false);
  };
  return (
    <>
      <span className="text-goose mt-16 mb-2 inline-block text-sm leading-4.5 font-medium">
        Filters
      </span>
      <div ref={dropDownRef} className="relative w-56.5 cursor-pointer">
        <button
          className="bg-sun hover:bg-sunset focus:bg-sunset rounded-xlg flex w-full items-center justify-between gap-8 py-3.5 pr-3.5 pl-4.5 transition-colors duration-300 ease-in-out focus:outline-none"
          onClick={toggleDropdown}>
          <div className="text-snow text-base leading-5 font-medium">
            {curFilter}
          </div>
          <svg
            className={`size-5 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""} stroke-snow fill-transparent`}>
            <use href={`${sprite}#icon-chevron`}></use>
          </svg>
        </button>
        {isOpen && (
          <div className="rounded-xlg absolute left-0 z-1 mt-2 flex h-54 w-full flex-col gap-2 bg-white px-4.5 py-3.5 shadow-[0_20px_69px_0_rgba(0,0,0,0.07]">
            {Array.isArray(options) &&
              options.map((option, i) => (
                <div
                  key={i}
                  onClick={() => handleOptionClick(option)}
                  className={`text-base leading-5 ${curFilter === option ? "text-waterloo" : "text-waterloo/20"}`}>
                  {option}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
