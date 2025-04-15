import { fetchFavorites, fetchPsychologists } from "../api/operations";

export const favoritesQueryOptions = {
  queryKey: ["favorites"],
  queryFn: fetchFavorites,
  initialPageParam: null,
};
export const psychologistQueryOptions = {
  queryKey: ["psychologists"],
  queryFn: fetchPsychologists,
  initialPageParam: null,
};
