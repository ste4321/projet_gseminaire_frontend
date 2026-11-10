import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useActualites } from '../contexts/ActualitesContext';
import { useLangue } from '../i18n';
import LangueSelecteur from './LangueSelecteur';

const THEME_STORAGE_KEY = 'theme';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { nonLues: unviewedCount, loading } = useActualites();
  const { langue, t } = useLangue();
  const n = t.nav;
  const [heroReady, setHeroReady] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) return saved === 'dark';
    return false; // par défaut : mode clair
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDark);
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  // Le menu mobile est un clone jQuery (sans React) : on y reporte le badge à chaque changement,
  // et un point sur le bouton « menu » signale les nouveautés quand le menu est fermé.
  // Le clone est aussi refait à chaque changement de langue, pour reprendre les libellés traduits.
  useEffect(() => {
    const libelle = n.nouvellesActus(unviewedCount);
    const original = document.querySelector('.menu-1 > ul');
    const copie = document.querySelector('#gtco-offcanvas > ul');
    if (original && copie && copie.dataset.langue !== langue) {
      const nouvelle = original.cloneNode(true);
      nouvelle.dataset.langue = langue;
      copie.replaceWith(nouvelle);
    }
    const synchroniser = () => {
      document.querySelectorAll('#gtco-offcanvas a[data-nav-section="info"]').forEach((lien) => {
        let badge = lien.querySelector('.nav-badge');
        if (unviewedCount > 0) {
          if (!badge) {
            badge = document.createElement('span');
            badge.className = 'nav-badge';
            lien.appendChild(badge);
          }
          badge.textContent = unviewedCount > 9 ? '9+' : String(unviewedCount);
          badge.title = libelle;
        } else if (badge) {
          badge.remove();
        }
      });
      document.querySelectorAll('.js-gtco-nav-toggle').forEach((bouton) => {
        bouton.classList.toggle('has-unread', unviewedCount > 0);
        bouton.dataset.unread = unviewedCount > 9 ? '9+' : String(unviewedCount);
        bouton.setAttribute('aria-label', unviewedCount > 0 ? `${n.menu} (${libelle})` : n.menu);
      });
    };
    synchroniser();
    // Le clone est créé par main.js après le premier rendu : on resynchronise quand il apparaît
    const observateur = new MutationObserver(synchroniser);
    observateur.observe(document.body, { childList: true });
    return () => observateur.disconnect();
  }, [unviewedCount, langue, n]);

  // Tant que la nav survole la bannière, les boutons mobiles (menu, thème)
  // doivent être clairs pour rester visibles sur la photo.
  useEffect(() => {
    const updateAtTop = () => {
      document.body.classList.toggle('at-top', window.scrollY <= 50);
    };
    updateAtTop();
    window.addEventListener('scroll', updateAtTop, { passive: true });
    return () => window.removeEventListener('scroll', updateAtTop);
  }, []);

  // Animation d'entrée de la bannière : on attend que l'écran de chargement
  // du template ait disparu (3,5 s au plus, au cas où il resterait bloqué)
  useEffect(() => {
    const startedAt = Date.now();
    const timer = setInterval(() => {
      const loader = document.querySelector('.gtco-loader');
      const style = loader && getComputedStyle(loader);
      const loaderGone =
        !loader || style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
      if (loaderGone || Date.now() - startedAt > 3500) {
        setHeroReady(true);
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Fermer le menu en cliquant sur un lien
  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  // Défilement doux vers une section, en tenant compte de la nav fixe
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 55;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="gtco-nav" role="navigation">
        <button
          type="button"
          className="theme-toggle-btn theme-toggle-mobile"
          onClick={() => setIsDark((prev) => !prev)}
          aria-label={isDark ? n.activerClair : n.activerSombre}
          title={isDark ? n.modeClair : n.modeSombre}
        >
          {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
        </button>
        <LangueSelecteur className="langue--coin" />
        <div className="container">
          <div className="row">
            <div className="col-sm-3 col-xs-12">
              <div id="gtco-logo">
                <a href="/" className="brand" aria-label={n.accueilAria}>
                  <span className="brand__emblem">
                    <img
                      src="/images/logo-gstf-48.png"
                      srcSet="/images/logo-gstf-48.png 1x, /images/logo-gstf-96.png 2x, /images/logo-gstf.png 3x"
                      alt=""
                      width="36"
                      height="36"
                    />
                  </span>
                  <span className="brand__text">
                    <span className="brand__name">G.S.T.F</span>
                    <span className="brand__sub">{n.brandSub}</span>
                  </span>
                </a>
              </div>
            </div>
            <div className="col-sm-9 col-xs-12 text-right menu-1 main-nav">
              <ul className={`menu-list ${isMenuOpen ? 'menu-open' : ''}`}>
                <li>
                  <a
                    href="#gtco-hero"
                    data-nav-section="home"
                    onClick={handleMenuClick}
                  >
                    {n.accueil}
                  </a>
                </li>
                <li>
                  <a
                    href="#gtco-about"
                    data-nav-section="about"
                    onClick={handleMenuClick}
                  >
                    {n.apropos}
                  </a>
                </li>
                <li>
                  <a
                    href="#gtco-practice-areas"
                    data-nav-section="practice-areas"
                    onClick={handleMenuClick}
                  >
                    {n.formation}
                  </a>
                </li>
                <li>
                  <a
                    href="#gtco-our-team"
                    data-nav-section="our-team"
                    onClick={handleMenuClick}
                  >
                    {n.equipe}
                  </a>
                </li>
                <li>
                  <a
                    href="#gtco-info"
                    data-nav-section="info"
                    onClick={handleMenuClick}
                  >
                    {n.info}
                    {!loading && unviewedCount > 0 && (
                      <span
                        className="nav-badge"
                        title={n.nouvellesActus(unviewedCount)}
                      >
                        {unviewedCount > 9 ? '9+' : unviewedCount}
                      </span>
                    )}
                  </a>
                </li>
                <li>
                  <a
                    href="#gtco-contact"
                    data-nav-section="contact"
                    onClick={handleMenuClick}
                  >
                    {n.contact}
                  </a>
                </li>
                <li className="theme-toggle-item">
                  <button
                    type="button"
                    className="theme-toggle-btn"
                    onClick={() => setIsDark((prev) => !prev)}
                    aria-label={isDark ? n.activerClair : n.activerSombre}
                    title={isDark ? n.modeClair : n.modeSombre}
                  >
                    {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
                  </button>
                </li>
                <li className="btn-cta">
                  <a
                    href="https://www.gestion.gstf-faliarivo.ovh"
                    onClick={(e) => {
                      e.preventDefault(); // empêcher Bootstrap de bloquer
                      window.open("https://www.gestion.gstf-faliarivo.ovh", "_blank", "noopener,noreferrer");
                    }}
                  >
                    <span>{n.seConnecter}</span>
                  </a>
                </li>
                <li className="langue-item">
                  <LangueSelecteur className="langue--menu" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <section
        id="gtco-hero"
        className={`gtco-cover ${heroReady ? 'is-ready' : ''}`}
        data-section="home"
        data-stellar-background-ratio="0.5"
      >
        <img src="/images/les_scolastiques.webp" alt="" className="gtco-cover-bg" loading="eager" />
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-md-offset-0 text-center">
              <div className="display-t">
                <div className="display-tc">
                  <div className={`hero-content ${heroReady ? 'is-ready' : ''}`}>
                    <p className="hero-kicker">{t.hero.kicker}</p>
                    <h1>
                      {t.hero.titre} <span>Faliarivo</span>
                    </h1>
                    <p className="hero-quote">
                      {t.hero.citation} <cite>{t.hero.reference}</cite>
                    </p>
                    <div className="hero-actions">
                      <a
                        href="#gtco-practice-areas"
                        className="hero-btn hero-btn-primary"
                        onClick={(e) => scrollToSection(e, 'gtco-practice-areas')}
                      >
                        {t.hero.decouvrir}
                      </a>
                      <a
                        href="#gtco-contact"
                        className="hero-btn hero-btn-ghost"
                        onClick={(e) => scrollToSection(e, 'gtco-contact')}
                      >
                        {t.hero.contacter}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Nav;