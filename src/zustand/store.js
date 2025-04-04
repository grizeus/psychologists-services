import { create } from "zustand";
import { rootSlice } from "./root/slice";
import { psychologistsSlice } from "./psychologists/slice";
import { favoritesSlice } from "./favorites/slice";
import { authSlice } from "./auth/slice";

const useStore = create(() => ({
  ...rootSlice(),
  ...psychologistsSlice(),
  ...favoritesSlice(),
  ...authSlice(),
}));

export default useStore;
