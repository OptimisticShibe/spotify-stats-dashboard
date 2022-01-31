import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import "./App.css";
import useAuth from "./useAuth";

function App() {
  const token = useAuth();
  const isLoggedIn = localStorage.getItem("accessToken");
  return isLoggedIn ? <Dashboard token={token} /> : <Login />;
}

export default App;
