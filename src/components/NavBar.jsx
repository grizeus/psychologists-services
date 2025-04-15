import { NavLink } from "react-router-dom";
import useStore from "../zustand/store";
import { useQueryClient } from "@tanstack/react-query";
import { favoritesQueryOptions } from "../lib/utils/query";

const cssBuilder = ({ isActive }) =>
  ` ${isActive && "after:bg-sun after:absolute after:top-6 after:left-1/2 after:size-2 after:-translate-x-1/2 after:rounded-full after:content-['']"} relative`;

const NavBar = () => {
  const user = useStore(state => state.user);
  const queryClient = useQueryClient();
  const handlePrefetchFavorites = () => {
    console.log("Hover/Focus detected, prefetching favorites...");
    // Use prefetchInfiniteQuery because the target page uses useInfiniteQuery
    queryClient.prefetchInfiniteQuery({
      ...favoritesQueryOptions, // Use the exact same shared options
    });
    // Note: We don't need getNextPageParam here, prefetch handles the basics
    // based on the queryFn returning nextPageParam.
  };
  return (
    <nav className="">
      <ul className="flex gap-4 lg:gap-10 lg:text-base lg:leading-tight text-sm leading-4"> 
        <li>
          <NavLink to="/" className={cssBuilder}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/psychologists" className={cssBuilder}>
            Psychologists
          </NavLink>
        </li>
        {user && (
        <li>
          <NavLink to="/favorites" className={cssBuilder} onMouseEnter={handlePrefetchFavorites} onFocus={handlePrefetchFavorites}>
            Favorites
          </NavLink>
        </li>)}
      </ul>
    </nav>
  );
};

export default NavBar;
