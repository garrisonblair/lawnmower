import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";

const AppRoutes = (): JSX.Element => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <Routes>
        <Route path={"/"} element={<Home />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
