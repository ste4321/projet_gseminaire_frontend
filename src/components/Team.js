import React, { useState } from "react";
import { useLangue } from "../i18n";

// Affiche le premier paragraphe, puis déplie le reste en douceur
// (le contenu reste dans la page pour pouvoir animer sa hauteur)
const Expandable = ({ intro, lireSuite, reduire, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <p>{intro}</p>
            <div className={`expandable ${isOpen ? "is-open" : ""}`} inert={!isOpen}>
                <div className="expandable__inner">{children}</div>
            </div>
            <button
                type="button"
                className={`read-toggle ${isOpen ? "is-open" : ""}`}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen ? reduire : lireSuite}
                <span className="read-toggle__icon" aria-hidden="true">↓</span>
            </button>
        </>
    );
};

const Team = () => {
    const { t } = useLangue();
    const e = t.equipe;
    // Une rubrique : photo + titre + texte dépliable (Parole du Recteur, visite du Cardinal Parolin)
    const rubriques = [
        { cle: "recteur", image: "images/arrivee-gstf.webp", classe: "team-item gtco-team-reverse", photo: "col-md-6 col-md-push-7", texte: "col-md-6  col-md-pull-6", effet: "fadeInRight" },
        { cle: "parolin", image: "images/messe-presidee-cardinal.webp", classe: "team-item gtco-team", photo: "col-md-6 col-md-pull-1", texte: "col-md-6", effet: "fadeInLeft" },
    ];
    return (
    <>
        <section id="gtco-our-team" data-section="our-team">
            <div className="container">
                <div className="row row-pb-md">
                    <div className="col-md-8 col-md-offset-2 heading animate-box" data-animate-effect="fadeIn">
                        <h1>{e.titre}</h1>
                        <p className="sub">{e.sousTitre}</p>
                    </div>
                </div>
                {rubriques.map((r) => (
                    <div key={r.cle} className={`row ${r.classe}`}>
                        <div className={`${r.photo} animate-box`} data-animate-effect={r.effet}>
                            <div className="img-shadow">
                                <img src={r.image} className="img-responsive" alt={e[r.cle].imageAlt} loading="lazy" />
                            </div>
                        </div>
                        <div className={`${r.texte} animate-box`} data-animate-effect={r.effet}>
                            <h2>{e[r.cle].titre}</h2>
                            <Expandable intro={e[r.cle].intro} lireSuite={e.lireSuite} reduire={e.reduire}>
                                {e[r.cle].suite.map((p, i) => <p key={i}>{p}</p>)}
                            </Expandable>
                        </div>
                    </div>
                ))}
            </div>
	    </section>
    </>
    );
  };

  export default Team;
