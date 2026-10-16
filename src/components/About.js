import React, { useState } from 'react';
import ReadMore from './ReadMore';

const About = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
              <h1>Présentation générale</h1>
              <p className="sub">G . S . T . F</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-md-pull-1 animate-box" data-animate-effect="fadeInLeft">
              <div className="img-shadow">
                <img src="images/cc.webp" className="img-responsive" alt="Grand Séminaire de Théologie Faliarivo" loading="lazy" />
              </div>
            </div>
            <div className="col-md-6 animate-box" data-animate-effect="fadeInLeft">
              <h2 className="heading-colored">Grand Séminaire de Théologie Faliarivo</h2>
              <p>
                Autrefois, tous les candidats au sacerdoce de Madagascar étudiaient au Grand Séminaire
                Saint Pierre d’Ambatoroka. Avec la décentralisation voulue par la Conférence Épiscopale,
                l’Archidiocèse du Centre s’est doté de son propre séminaire de théologie, inauguré à
                Faliarivo le 13 octobre 1998.
              </p>
              <p>
                <button translate="no" onClick={openModal} className="read-more">
                  Découvrir notre histoire <i className="icon-chevron-right"></i>
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
  