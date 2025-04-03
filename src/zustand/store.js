import { create } from "zustand";
import { rootSlice } from "./root/slice";
import { psychologistsSlice } from "./psychologists/slice";
import { favoritesSlice } from "./favorites/slice";

const useStore = create(() => ({
  ...rootSlice(),
  ...psychologistsSlice(),
  ...favoritesSlice(),
}));

export default useStore;
