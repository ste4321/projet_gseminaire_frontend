import useScripts from "./hooks/useScripts";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangueProvider } from "./i18n";

function App() {
  useScripts([
    "/js/jquery.min.js",
    "/js/jquery.waypoints.min.js",
    "/js/jquery.easing.1.3.js",
    "/js/bootstrap.min.js",
    "/js/jquery.stellar.min.js",
    "/js/jquery.magnific-popup.min.js",
    "/js/magnific-popup-options.js",
    "/js/main.js",
  ]);

  return (
    <LangueProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LangueProvider>
  );
}

export default App;
