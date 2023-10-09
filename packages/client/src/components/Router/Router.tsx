import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LazyHome } from "./elements";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LazyHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
