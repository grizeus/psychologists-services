import { create } from "zustand";

const useStore = create(() => ({
  curFilter: "Show all",
  dataCollection: [],
  favsCollection: [],
  total: 0,
  totalFavs: 0,
  lastDoc: null,
  lastFavDoc: null,
  isMoreData: true,
  isMoreFavData: true,
  isLoading: false,
  error: null,
}));

export default useStore;
