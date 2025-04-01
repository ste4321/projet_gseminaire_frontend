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
                <img src="images/cc.jpg" className="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co" />
              </div>
            </div>
            <div className="col-md-6 animate-box" data-animate-effect="fadeInLeft">
              <h2 className="heading-colored">Grand Séminaire Faliarivo</h2>
              <p>
                Malgré le souvenir attendri du bon vieux temps où tous les candidats au sacerdoce,
                du Cap d’Ambre au Cap Sainte Marie, effectuaient leurs études canoniques au Grand Séminaire Saint Pierre,
                d’Ambatoroka, tout de granit, ou presque – et ceci depuis le 21 novembre 1929 – inauguration le 3 avril 1930 –
                étant donné que toute vie réussie dure, croît et déborde, la Conférence Épiscopale de Madagascar estima le moment
                venu de procéder à la décentralisation. Pour l’Archidiocèse du Centre, les cours de Philosophie émigrèrent à
                Antsirabe en 1986...
              </p>
              <p>
                <button translate="no" onClick={openModal} className="read-more">
                  Voir plus <i className="icon-chevron-right"></i>
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
  