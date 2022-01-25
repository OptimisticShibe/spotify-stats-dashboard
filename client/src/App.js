import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import "./App.css";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  console.log(code);

  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
