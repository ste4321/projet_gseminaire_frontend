import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "./EquipeFormatrice.css"; // Assure-toi que ce chemin correspond à ton dossier CSS

const equipe = [
  { role: "Recteur", nom: "P. RAFIDISON Abdon", tel: "+261 34 10 600 04" },
  { role: "Économe", nom: "P. RAMAROSANDRATANA Claude Rolland", tel: "+261 33 70 003 76" },
  { role: "Animateur spirituel", nom: "P. RAKOTOMAHEFA Jean Félicien", tel: "+261 34 68 210 54" },
  { role: "Formateur", nom: "P. RATELOARISON Jean Athanase", tel: "+261 34 4170480" },
  { role: "Préfet des Études", nom: "P. RAZAFINIARIVO Rodolphe Onjaniaina", tel: "+261 34 92 920 77" },
  { role: "Sœur intendante", nom: "Sr. RAZANAPARANY Angeline", tel: "+261 34 36 058 54" },
];

const EquipeFormatrice = () => {
  return (
    <div className="equipe-container">
      <div className="carousel-wrapper">
        <h2 className="carousel-title">L’équipe formatrice</h2>
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          interval={3000}
          transitionTime={500}
          showStatus={false}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                className="custom-arrow custom-arrow-prev"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                className="custom-arrow custom-arrow-next"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="arrow-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )
          }
        >
          {equipe.map((personne, index) => (
            <div key={index} className="card">
              <h3 className="card-title">{personne.role}</h3>
              <p className="card-name">{personne.nom}</p>
              <p className="card-tel">{personne.tel}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default EquipeFormatrice;
