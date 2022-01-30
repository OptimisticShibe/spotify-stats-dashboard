import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import "./App.css";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { ProvideAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = ProvideAuth();
  console.log({ isLoggedIn });

  return isLoggedIn ? <Dashboard /> : <Login />;
}

export default App;
