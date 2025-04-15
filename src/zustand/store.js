import { create } from "zustand";
import { filterSlice } from "./filter/slice";
import { favoritesSlice } from "./favorites/slice";
import { authSlice } from "./auth/slice";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      ...filterSlice(set, get),
      ...favoritesSlice(set, get),
      ...authSlice(set, get),
    }),
    {
      name: "persist-storage",
      partialize: state => ({
        user: state.user,
        favorites: state.favorites,
      }),
    }
  )
);

export default useStore;
