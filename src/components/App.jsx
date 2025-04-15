import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./SharedLayout";
import PrivateRoute from "../routes/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const HomePage = lazy(() => import("../pages/Home"));
const PsychologistsPage = lazy(() => import("../pages/Psychologists"));
const FavoritesPage = lazy(() => import("../pages/Favorites"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<SharedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/psychologists" element={<PsychologistsPage />} />
            <Route
              path="/favorites"
              element={
                <PrivateRoute component={<FavoritesPage />} redirectTo="/" />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
