import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateEditPage from "./pages/CreateAndEditPage.tsx";
import DetailsPage from "./pages/DetailsPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pokemon/create" element={<CreateEditPage />} />
      <Route path="/pokemon/edit/:id" element={<CreateEditPage />} />
      <Route path="/pokemon/:id" element={<DetailsPage />} />
    </Routes>
  );
};

export default App;

