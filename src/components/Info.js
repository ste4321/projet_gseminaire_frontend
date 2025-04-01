import React, { useState, useEffect } from 'react';
import '../styles/Info.css';

const Info = () => {
  // État pour gérer l'élément sélectionné
  const [selectedInfo, setSelectedInfo] = useState(null);

  // Données statiques simulant un appel API
  const infos = [
    {
      id: 'modal-06',
      title: 'Notre visée',
      date: '25/06/2000',
      admin: 'P. RAFIDISON Abdon',
      description: 'Le Studium du GSTF permet aux étudiants de s’initier à une première approche de la théologie, en suivant un cursus de premier cycle préparant un Baccalauréat canonique de théologie. Notre visée est double : a) acquérir une intelligence et une structuration plus profonde et plus personnelle de la foi chrétienne, b) se former de manière universitaire en Théologie en vue de l’exercice du ministère du prêtre.',
    },
    {
      id: 'modal-07',
      title: 'Conditions d’admission',
      date: '16/11/2000',
      admin: 'P. RAZAFINIARIVO Rodolphe Onjaniaina',
      description: "Le Studium du GSTF est ouvert à tout candidat au sacerdoce qui a terminé les deux années de Philosophie et une année de Théologie dite fondamentale. Le candidat doit être présenté, avec le relevé de notes de ces trois années, soit par son évêque soit par son Supérieur, par écrit.  L’inscription et la réinscription des étudiants pour l’année universitaire prochaine se fait au GSTF auprès du Recteur ou du Préfet des Études à la fin de l’année académique en cours.",
    },
    {
      id: 'modal-08',
      title: 'Notes disciplinaires ',
      date: '25/03/2025',
      admin: 'P. RATELOARISON Jean Athanase',
      description: "Quelques points sont retenus lors du conseil des professeurs à la fin de chaque semestre. 1) Pour notre formation humaine, le respect mutuel entre étudiants et enseignants est fort indispensable. 2) Par conséquent, que tout téléphone portable soit éteint dans la salle de classe, et que ceci soit strictement interdit d’y entrer pendant l’examen. Il est interdit aussi d’enregistrer des cours au Grand Séminaire de Théologie à Faliarivo. 3) Les fraudes et les tentatives de fraudes : cas de renvoi définitif.  4) La ponctualité est exigée. 5) L’absence sans motif est inacceptable soit interne soit externe. Il n’y a pas de cours facultatif au Grand Séminaire. Il est à noter que le repêchage est possible seulement une fois ; mais après un repêchage, si le concernant n’a pas encore eu la moyenne de 10/20, il sera automatiquement exclu à l’admission de l’obtention du diplôme préparé par l’UCM.",
    }
  ];
  useEffect(() => {
    const gototopElement = document.querySelector('.gototop.js-top');
    const floatingButton = document.querySelector('.floating-button');

    if (selectedInfo) {
      document.body.style.overflow = 'hidden';

      if (gototopElement) {
        gototopElement.style.display = 'none';
      }

      // Masquer le bouton flottant si présent
      if (floatingButton) {
        floatingButton.style.display = 'none';
      }
    } else {
      // Réactiver le scroll quand le modal est fermé
      document.body.style.overflow = '';

      if (gototopElement) {
        gototopElement.style.display = '';
      }
      if (floatingButton) {
        floatingButton.style.display = '';
      }
    }

    // Cleanup en cas de démontage du composant
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedInfo]);
  return (
    <section id="gtco-info" data-section="info">
      <div className="container">
        <div className="row row-pb-md">
          <div
            className="col-md-8 col-md-offset-2 heading animate-box"
            data-animate-effect="fadeIn"
          >
            <h1>Information</h1>
            <p className="sub">
              Cette section contient toutes les informations publiées par les administrateurs du G.S.T.F.
            </p>
          </div>
        </div>

        {/* Liste d'informations */}
        <ul className="folio-list row block-lg-one-half block-stack-on-1000">
          {infos.map(info => (
            <li
              key={info.id}
              className="folio-list__item column"
              data-animate-el
              translate="no" onClick={() => setSelectedInfo(info)}
            >
              <div className="folio-list__item-link">
                <div className="folio-list__item-text">
                  <div className="folio-list__item-cat">
                    Auteur : {info.admin}
                  </div>
                  <div className="folio-list__item-title">
                    {info.title}
                  </div>
                  <div className="folio-list__item-date">
                    Sortie le : {info.date}
                  </div>
                </div>
              </div>
              <a className="folio-list__proj-link" href="/modal" title="Voir plus">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {selectedInfo && (
        <div className="modal-overlay" translate="no" onClick={() => setSelectedInfo(null)}>
          <div className="modal-content" translate="no" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedInfo.title}</h2>
              <span className="close-button" translate="no" onClick={() => setSelectedInfo(null)}>&times;</span>
            </div>
            <div className="modal-body">
              <p className="modal-date">{selectedInfo.date}</p>
              <p className="modal-description">{selectedInfo.description}</p>
            </div>
            <div className="modal-footer">
              <p className="modal-admin">Publié par : {selectedInfo.admin}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Info;
