import { useEffect, useState } from "react";

import PsychologistCard from "../components/PsychologistsCard";
import Filter from "../components/Filter";
import { fetchCollection } from "../zustand/psychologists/operations";
import useStore from "../zustand/store";
import { fetchAllFavorites } from "../zustand/favorites/operations";

const Psychologists = () => {
  const user = useStore(state => state.user);
  const isLoading = useStore(state => state.isLoading);
  const isMoreData = useStore(state => state.isMoreData);
  const total = useStore(state => state.total);
  const curFilter = useStore(state => state.curFilter);
  const dataCollection = useStore(state => state.dataCollection);
  const generalFavs = useStore(state => state.generalFavsCollection);
  const [filteredData, setFilteredData] = useState(dataCollection);
  useEffect(() => {
    if (dataCollection.length === 0) {
      fetchCollection();
    }
    if (generalFavs.length === 0) {
      fetchAllFavorites();
    }
  }, [user]);

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
        return psychologists.slice().filter(item => item.price_per_hour < 10);
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
    const filteredData = applyFilter(dataCollection, curFilter);
    setFilteredData(filteredData);
  }, [dataCollection, curFilter]);

  return (
    <>
      <Filter />
      <ul className="mt-8 flex flex-col gap-8">
        {Array.isArray(filteredData) &&
          filteredData.length > 0 &&
          filteredData.map(item => (
            <PsychologistCard doctor={item} key={item.id} />
          ))}
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
