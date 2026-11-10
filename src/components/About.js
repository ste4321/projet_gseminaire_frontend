import React, { useState } from 'react';
import ReadMore from './ReadMore';
import { useLangue } from '../i18n';

const About = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { t } = useLangue();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <section id="gtco-about" data-section="about">
        <div className="container">
          <div className="row row-pb-md">
            <div className="col-md-8 col-md-offset-2 heading animate-box" data-animate-effect="fadeIn">
              <h1>{t.apropos.titre}</h1>
              <p className="sub">G . S . T . F</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-md-pull-1 animate-box" data-animate-effect="fadeInLeft">
              <div className="img-shadow">
                <img src="images/cc.webp" className="img-responsive" alt={t.apropos.imageAlt} loading="lazy" />
              </div>
            </div>
            <div className="col-md-6 animate-box" data-animate-effect="fadeInLeft">
              <h2 className="heading-colored">{t.apropos.nom}</h2>
              <p>{t.apropos.texte}</p>
              <p>
                <button translate="no" onClick={openModal} className="read-more">
                  {t.apropos.decouvrir} <i className="icon-chevron-right"></i>
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
      <ReadMore isOpen={modalIsOpen} onRequestClose={closeModal} />
    </>
  );
};
  
  export default About;
  