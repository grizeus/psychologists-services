import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import SharedLayout from "./SharedLayout";
import PrivateRoute from "../routes/PrivateRoute";

const HomePage = lazy(() => import("../pages/Home"));
const PsychologistsPage = lazy(() => import("../pages/Psychologists"));
const FavoritesPage = lazy(() => import("../pages/Favorites"));
const NotFoundPage = lazy(() => import("../pages/NotFound"));

function App() {
  return (
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
  );
}

export default App;
