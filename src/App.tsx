import * as React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import {LoginPage} from "./Pages/LoginPage";
import {MainPage} from "./Pages/MainPage";

import AuthProvider from "./Components/AuthProvider";
import RequireAuth from "./Methods/RequireAuth";
import Layout from "./Components/Layout"


export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}










