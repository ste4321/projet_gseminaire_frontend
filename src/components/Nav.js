import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unviewedCount, setUnviewedCount] = useState(0);

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/infos');

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

  // Fermer le menu en cliquant sur un lien
  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="gtco-nav" role="navigation">
        <div className="container">
          <div className="row">
            <div className="col-sm-2 col-xs-12">
              <div id="gtco-logo">
                <a href="/" aria-label="Retour à l'accueil">
                  G.S.T.F
                </a>
              </div>
            </div>
            <div className="col-sm-10 col-xs-12 text-right menu-1 main-nav">
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
        className="gtco-cover"
        style={{ backgroundImage: `url(/images/les_scolastiques.jpg)` }}
        data-section="home"
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-md-offset-0 text-center">
              <div className="display-t">
                <div className="display-tc">
                  <h1 className="animate-box" data-animate-effect="fadeIn">
                    « Soyez toujours prêts à justifier votre espérance » (1Pi 3, 15).
                  </h1>
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