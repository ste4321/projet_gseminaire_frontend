import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaMoon, FaSun } from 'react-icons/fa';
import { API_URL } from '../config';

const THEME_STORAGE_KEY = 'theme';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unviewedCount, setUnviewedCount] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDark);
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/infos`);

        // Calculer le nombre d'infos non vues
        const savedViewedInfos = localStorage.getItem('viewedInfos');
        const viewedInfos = savedViewedInfos ? JSON.parse(savedViewedInfos) : [];
        const unviewed = response.data.filter(info => !viewedInfos.includes(info.id)).length;
        setUnviewedCount(unviewed);
        
      } catch (error) {
        console.error("Erreur lors du chargement des infos :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfos();

    // Écouter les mises à jour du badge
    const handleUpdateBadge = (event) => {
      const { totalInfos, viewedInfos } = event.detail;
      setUnviewedCount(totalInfos - viewedInfos);
    };

    window.addEventListener('updateInfoBadge', handleUpdateBadge);

    return () => {
      window.removeEventListener('updateInfoBadge', handleUpdateBadge);
    };
  }, []);

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
          aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
          title={isDark ? 'Mode clair' : 'Mode sombre'}
        >
          {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
        </button>
        <div className="container">
          <div className="row">
            <div className="col-sm-3 col-xs-12">
              <div id="gtco-logo">
                <a href="/" className="brand" aria-label="Grand Séminaire de Théologie Faliarivo — accueil">
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
                    <span className="brand__sub">Grand Séminaire · Faliarivo</span>
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
                    Accueil
                  </a>
                </li>
                <li>
                  <a
                    href="#gtco-about"
                    data-nav-section="about"
                    onClick={handleMenuClick}
                  >
                    À propos
                  </a>
                </li>
                <li>
                  <a
                    href="#gtco-practice-areas"
                    data-nav-section="practice-areas"
                    onClick={handleMenuClick}
                  >
                    Formation
                  </a>
                </li>
                <li>
                  <a
                    href="#gtco-our-team"
                    data-nav-section="our-team"
                    onClick={handleMenuClick}
                  >
                    Équipe
                  </a>
                </li>
                <li>
                  <a
                    href="#gtco-info"
                    data-nav-section="info"
                    onClick={handleMenuClick}
                  >
                    Info
                    {!loading && unviewedCount > 0 && (
                      <span
                        className="badge bg-danger ms-1"
                        title={`${unviewedCount} nouvelle${unviewedCount > 1 ? 's' : ''} information${unviewedCount > 1 ? 's' : ''}`}
                      >
                        {unviewedCount}
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
                    Contact
                  </a>
                </li>
                <li className="theme-toggle-item">
                  <button
                    type="button"
                    className="theme-toggle-btn"
                    onClick={() => setIsDark((prev) => !prev)}
                    aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
                    title={isDark ? 'Mode clair' : 'Mode sombre'}
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
                    <span>Se connecter</span>
                  </a>
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
                    <p className="hero-kicker">Antananarivo · Madagascar</p>
                    <h1>
                      Grand Séminaire de Théologie <span>Faliarivo</span>
                    </h1>
                    <p className="hero-quote">
                      « Soyez toujours prêts à justifier votre espérance » <cite>(1Pi 3, 15)</cite>
                    </p>
                    <div className="hero-actions">
                      <a
                        href="#gtco-practice-areas"
                        className="hero-btn hero-btn-primary"
                        onClick={(e) => scrollToSection(e, 'gtco-practice-areas')}
                      >
                        Découvrir la formation
                      </a>
                      <a
                        href="#gtco-contact"
                        className="hero-btn hero-btn-ghost"
                        onClick={(e) => scrollToSection(e, 'gtco-contact')}
                      >
                        Nous contacter
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