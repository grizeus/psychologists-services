import { NavLink } from "react-router-dom";
import useStore from "../zustand/store";
import { useQueryClient } from "@tanstack/react-query";
import {
  favoritesQueryOptions,
  psychologistQueryOptions,
} from "../lib/utils/query";
import { useEffect } from "react";
import { fetchAllFavorites } from "../zustand/favorites/operations";

const cssBuilder = ({ isActive }) =>
  ` ${isActive && "after:bg-sun after:absolute after:top-6 after:left-1/2 after:size-2 after:-translate-x-1/2 after:rounded-full after:content-['']"} relative`;

const NavBar = () => {
  const user = useStore(state => state.user);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      fetchAllFavorites();
    }
  }, [user])

  const handlePrefetchFavorites = () => {
    queryClient.prefetchInfiniteQuery({
      ...favoritesQueryOptions,
    });
  };
  const handlePrefetchPsychologists = () => {
    queryClient.prefetchInfiniteQuery({
      ...psychologistQueryOptions,
    });
  };

  return (
    <nav className="">
      <ul className="flex gap-4 text-sm leading-4 lg:gap-10 lg:text-base lg:leading-tight">
        <li>
          <NavLink to="/" className={cssBuilder}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/psychologists"
            className={cssBuilder}
            onMouseEnter={handlePrefetchPsychologists}
            onFocus={handlePrefetchPsychologists}>
            Psychologists
          </NavLink>
        </li>
        {user && (
          <li>
            <NavLink
              to="/favorites"
              className={cssBuilder}
              onMouseEnter={handlePrefetchFavorites}
              onFocus={handlePrefetchFavorites}>
              Favorites
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
