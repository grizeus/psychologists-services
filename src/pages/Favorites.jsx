import { useEffect, useMemo, useState } from "react";
import useStore from "../zustand/store";
import PsychologistCard from "../components/PsychologistsCard";
import Filter from "../components/Filter";
import { favoritesQueryOptions } from "../lib/utils/query";
import { useInfiniteQuery } from "@tanstack/react-query";

const Favorites = () => {
  const user = useStore(state => state.user);
  const curFilter = useStore(state => state.curFilter);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    ...favoritesQueryOptions,
    getNextPageParam: lastPage => lastPage.nextPageParam,
    enabled: !!user,
  });

  const allFavorites = useMemo(
    () => data?.pages.flatMap(page => page.data) ?? [],
    [data]
  );
  
  const [filteredData, setFilteredData] = useState([]);

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
    const filtered = applyFilter(allFavorites, curFilter);
    setFilteredData(filtered);
  }, [allFavorites, curFilter]);

  if (!user) {
    return (
      <div className="p-8 text-center">
        Please log in to view your favorites.
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-8 text-center">Loading your favorites...</div>;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading favorites:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <>
      <Filter />
      <ul className="mt-8 flex flex-col gap-8">
        {Array.isArray(filteredData) && filteredData.length > 0 ? (
          filteredData.map(item => (
            <PsychologistCard doctor={item} key={`${item.id}-fav`} />
          ))
        ) : (
          <p className="text-center text-lg leading-6">No favorites yet</p>
        )}
      </ul>
      {isLoading && <div>Loading...</div>}

      {hasNextPage && (
        <div className="flex justify-center pt-16 pb-25">
          <button
            type="button"
            className="text-snow rounded-3xlg hover:bg-sunset focus:bg-sunset bg-sun px-12 py-3.5 text-base leading-tight font-medium transition-colors duration-300 ease-in-out focus:outline-none"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}>
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default Favorites;
