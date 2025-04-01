const Nav = () => {
  return (
    <>
      <nav className="gtco-nav" role="navigation">
        <div className="container">
          <div className="row">
            <div className="col-sm-2 col-xs-12">
              <div id="gtco-logo">
                <a href="/">Grand Séminaire</a>
              </div>
            </div>
            <div className="col-sm-10 col-xs-12 text-right menu-1 main-nav">
              <ul>
                <li className="active">
                  <a href="/home" data-nav-section="home">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="/about" data-nav-section="about">
                    A propos
                  </a>
                </li>
                <li>
                  <a href="/practice-areas" data-nav-section="practice-areas">
                    Formation
                  </a>
                </li>
                <li>
                  <a href="/our-team" data-nav-section="our-team">
                    Equipe
                  </a>
                </li>
                <li>
                  <a href="/info" data-nav-section="info">
                    Informations
                  </a>
                </li>
                <li className="btn-cta">
                  <a href="/contact" data-nav-section="contact">
                  <span>Contact</span>
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
