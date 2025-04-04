import { create } from "zustand";
import { rootSlice } from "./root/slice";
import { psychologistsSlice } from "./psychologists/slice";
import { favoritesSlice } from "./favorites/slice";
import { authSlice } from "./auth/slice";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      ...rootSlice(set, get),
      ...psychologistsSlice(set, get),
      ...favoritesSlice(set, get),
      ...authSlice(set, get),
    }),
    {
      name: "auth-storage",
      partialize: state => ({
        user: state.user,
      }),
    }
  )
);

export default useStore;
