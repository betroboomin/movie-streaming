import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../view/Home";
import Catalog from "../view/Catalog";
import Detail from "../view/Detail";

const Routing = () => {
  return (
    <Routes>
      <Route path='/:category/search/:keyword' element={<Catalog />} />
      <Route path='/:category/:id' element={<Detail />} />
      <Route path='/:category' element={<Catalog />} />
      <Route path='/' element={<Home />} />
    </Routes>
  );
}

export default Routing;