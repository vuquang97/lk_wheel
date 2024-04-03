import { Route, Routes } from "react-router-dom";
import "./App.css";
import LuckyWheel from "./pages/lucky-wheel";
import NoMatch from "./NoMatch";
import Settings from "./pages/settings";
import Login from "./pages/login";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    return () => {
      localStorage.removeItem("_account");
    };
  }, []);
  return (
    <div>
      <Routes>
        <Route path="settings" exact element={<Settings />} />
        <Route path="wheel" exact element={<LuckyWheel />} />
        <Route path="/" element={<Login />}>
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
