export const favoritesSlice = () => ({
  favsCollection: [], // paginated Id's collection for favorites page
  generalFavsCollection: [], // all favorites collection for profile page
  actualFavs: [], // actual paginated docs collection for favorites page
  totalFavs: 0,
  lastFavDoc: null,
  isMoreFavData: true,
});
