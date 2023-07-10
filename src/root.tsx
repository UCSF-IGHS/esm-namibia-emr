import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function Root() {
  return (
    <BrowserRouter basename={window["getOpenmrsSpaBase"]()}>
      <Routes>
        <Route
          path="/home"
          element={<Navigate to={"/dashboard/mother-child-health"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export function ConfigInitializer() {
  return <></>;
}
