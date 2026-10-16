import React from "react";
import { FaPhoneAlt } from "react-icons/fa";

const equipe = [
  { role: "Recteur", nom: "P. RAFIDISON Abdon", tel: "+261 34 10 600 04" },
  { role: "Économe", nom: "P. RAMAROSANDRATANA Claude Rolland", tel: "+261 33 70 003 76" },
  { role: "Animateur spirituel", nom: "P. RAKOTOMAHEFA Jean Félicien", tel: "+261 34 68 210 54" },
  { role: "Formateur", nom: "P. RATELOARISON Jean Athanase", tel: "+261 34 41 704 80" },
  { role: "Préfet des Études", nom: "P. RAZAFINIARIVO Rodolphe Onjaniaina", tel: "+261 34 92 920 77" },
  { role: "Sœur intendante", nom: "Sr. RAZANAPARANY Angeline", tel: "+261 34 36 058 54" },
];

// Toute l'équipe visible d'un coup ; numéros cliquables sur téléphone
const EquipeFormatrice = () => {
  return (
    <section className="team-list" aria-labelledby="team-list-title">
      <div className="container">
        <h2 id="team-list-title" className="team-list__title">L’équipe formatrice</h2>
        <ul className="team-list__grid">
          {equipe.map((personne) => (
            <li key={personne.nom} className="team-list__card">
              <p className="team-list__role">{personne.role}</p>
              <p className="team-list__name">{personne.nom}</p>
              <a className="team-list__tel" href={`tel:${personne.tel.replace(/\s/g, "")}`}>
                <FaPhoneAlt size={12} aria-hidden="true" /> {personne.tel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default EquipeFormatrice;
