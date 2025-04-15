import { fetchFavorites } from "../../zustand/favorites/operations";

export const favoritesQueryOptions = {
  queryKey: ["favorites"],
  queryFn: fetchFavorites,
  initialPageParam: null,
};
