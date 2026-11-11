import { useEffect } from "react";
import useScripts from "./hooks/useScripts";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangueProvider } from "./i18n";

// Scripts du template encore utiles : menu mobile, défilement animé, animations au défilement.
// (bootstrap.min.js, Stellar et Magnific Popup ne servaient à rien et ont été retirés.)
const SCRIPTS = [
  "/js/jquery.min.js",
  "/js/jquery.waypoints.min.js",
  "/js/jquery.easing.1.3.js",
  "/js/main.js",
];

function App() {
  useScripts(SCRIPTS);

  // La page est affichée : on retire l'écran de chargement sans attendre les scripts jQuery
  useEffect(() => {
    document.querySelector(".gtco-loader")?.classList.add("is-hidden");
  }, []);

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
