import { useState } from "react";

import "./App.css";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Profil from "./pages/Profil";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
