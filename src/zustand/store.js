import { create } from "zustand";

const useStore = create(() => ({
  curFilter: "A to Z",
  dataCollection: [],
  total: 0,
  lastDoc: null,
  isMoreData: true,
  isLoading: false,
  error: null,
}));

export default useStore;
