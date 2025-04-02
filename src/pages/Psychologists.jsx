import { useEffect, useState } from "react";

import PsychologistCard from "../components/PsychologistsCard";
import Filter from "../components/Filter";
import { fetchCollection } from "../zustand/operations";
import useStore from "../zustand/store";

const Psychologists = () => {
  const { dataCollection: data, isLoading, isMoreData, total, curFilter } = useStore();
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    fetchCollection();
  }, []);

  const applyFilter = (psychologists, filter) => {
    switch (filter) {
      case "A to Z":
        return psychologists
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
      case "Z to A":
        return psychologists
          .slice()
          .sort((a, b) => b.name.localeCompare(a.name));
      case "Less than 10$":
        return psychologists
          .slice()
          .filter((item) => item.price_per_hour < 10);
      case "Greater than 10$":
        return psychologists.slice().filter(item => item.price_per_hour > 10);
      case "Popular":
        return psychologists.slice().sort((a, b) => b.rating - a.rating);
      case "Not popular":
        return psychologists.slice().sort((a, b) => a.rating - b.rating);
      default:
        return psychologists;
    }
  };

  useEffect(() => {
    const filteredData = applyFilter(data, curFilter);
    setFilteredData(filteredData);
  }, [data, curFilter]);
  return (
    <>
      <Filter />
      <ul className="mt-8 flex flex-col gap-8">
        {Array.isArray(filteredData) &&
          filteredData.length > 0 &&
          filteredData.map(item => <PsychologistCard doctor={item} key={item.id} />)}
      </ul>
      {isLoading && <div>Loading...</div>}

      {isMoreData && filteredData.length > 0 && filteredData.length < total && (
        <div className="flex justify-center pt-16 pb-25">
          <button
            type="button"
            className="text-snow rounded-3xlg hover:bg-sunset focus:bg-sunset bg-sun px-12 py-3.5 text-base leading-tight font-medium transition-colors duration-300 ease-in-out focus:outline-none"
            onClick={() => fetchCollection()}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default Psychologists;
