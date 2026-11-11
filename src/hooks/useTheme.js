import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";

// Thème clair / sombre.
// - Choix du visiteur gardé dans ce navigateur ; sans choix, on suit le réglage du système.
// - La classe `dark-mode` est posée dès le chargement par index.html (pas de flash en clair) :
//   c'est elle qui fait foi pour l'état initial.
// - Bascule animée (cercle qui s'étend depuis le bouton) quand le navigateur le permet.
const CLE = "theme";
const COULEUR_BARRE = { clair: "#8d5e08", sombre: "#121212" };

const requeteSysteme = () => window.matchMedia?.("(prefers-color-scheme: dark)");

const lireChoix = () => {
  try {
    const v = localStorage.getItem(CLE);
    return v === "dark" || v === "light" ? v : null;
  } catch {
    return null;
  }
};

const enregistrerChoix = (sombre) => {
  try {
    localStorage.setItem(CLE, sombre ? "dark" : "light");
  } catch {
    // stockage bloqué : le choix vaut pour cette visite seulement
  }
};

const appliquer = (sombre) => {
  const html = document.documentElement;
  // Pas de transitions CSS pendant le changement : sinon la page et les zones
  // « ré-inversées » (bannière, images…) changent à des rythmes différents et clignotent.
  html.classList.add("theme-switching");
  html.classList.toggle("dark-mode", sombre);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", sombre ? COULEUR_BARRE.sombre : COULEUR_BARRE.clair);
  requestAnimationFrame(() => requestAnimationFrame(() => html.classList.remove("theme-switching")));
};

const useTheme = () => {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark-mode"));

  useEffect(() => {
    appliquer(isDark);
  }, [isDark]);

  // Sans choix enregistré : on suit le système s'il change (ex. passage automatique au soir)
  useEffect(() => {
    const requete = requeteSysteme();
    if (!requete) return undefined;
    const suivre = (e) => {
      if (!lireChoix()) setIsDark(e.matches);
    };
    requete.addEventListener("change", suivre);
    return () => requete.removeEventListener("change", suivre);
  }, []);

  // Même thème dans tous les onglets ouverts du site
  useEffect(() => {
    const synchroniser = (e) => {
      if (e.key === CLE) setIsDark(e.newValue ? e.newValue === "dark" : Boolean(requeteSysteme()?.matches));
    };
    window.addEventListener("storage", synchroniser);
    return () => window.removeEventListener("storage", synchroniser);
  }, []);

  /** Bascule le thème ; `event` (clic) sert d'origine à l'animation. */
  const basculer = useCallback(
    (event) => {
      const suivant = !isDark;
      enregistrerChoix(suivant);

      const sansAnimation =
        !document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (sansAnimation) {
        setIsDark(suivant);
        return;
      }

      // Origine du cercle : centre du bouton (ou du clavier : centre du bouton aussi)
      const rect = event?.currentTarget?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : 0;
      const rayon = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

      const transition = document.startViewTransition(() => {
        flushSync(() => setIsDark(suivant));
        appliquer(suivant);
      });
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rayon}px at ${x}px ${y}px)`] },
            { duration: 500, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
          );
        })
        .catch(() => {});
    },
    [isDark]
  );

  return { isDark, basculer };
};

export default useTheme;
