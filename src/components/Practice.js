import React, { useState } from 'react';
import SidePanel, { PanelBlocks } from './SidePanel';
import { FaUsers, FaBrain, FaChurch } from 'react-icons/fa';
import { GiAngelWings } from 'react-icons/gi';
import { useLangue } from '../i18n';

// Les quatre dimensions de la formation, dans l'ordre de lecture du panneau.
// Textes : i18n/<langue>.js, clé « formation.dimensions » (même identifiant).
const DIMENSIONS = [
  { id: 'humaine', Icon: FaUsers },
  { id: 'spirituelle', Icon: GiAngelWings },
  { id: 'intellectuelle', Icon: FaBrain },
  { id: 'pastorale', Icon: FaChurch },
];

const Practice = () => {
  const { t } = useLangue();
  const f = t.formation;
  const dimensions = DIMENSIONS.map((d) => ({ ...d, ...f.dimensions[d.id] }));
  // Index de la dimension ouverte dans le panneau (null = fermé)
  const [openIndex, setOpenIndex] = useState(null);
  const [lastIndex, setLastIndex] = useState(0);

  const open = (index) => {
    setOpenIndex(index);
    setLastIndex(index);
  };
  const close = () => setOpenIndex(null);

  // Le panneau garde son contenu pendant l'animation de fermeture
  const current = dimensions[lastIndex];
  const prev = dimensions[lastIndex - 1];
  const next = dimensions[lastIndex + 1];

  const renderCard = (dimension) => {
    const index = dimensions.indexOf(dimension);
    const { Icon } = dimension;
    return (
      <div key={dimension.id} className="gtco-practice-area-item animate-box">
        <div className="gtco-icon">
          <Icon size={50} color="#855d08" />
        </div>
        <div className="gtco-copy">
          <h3>{dimension.title}</h3>
          <p>
            {dimension.excerpt}{' '}
            <a
              href={`#${dimension.id}`}
              translate="no"
              onClick={(e) => {
                e.preventDefault();
                open(index);
              }}
            >
              {f.lireSuite}
            </a>
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <section id="gtco-practice-areas" data-section="practice-areas">
        <div className="container">
          <div className="row row-pb-md">
            <div
              className="col-md-8 col-md-offset-2 heading animate-box"
              data-animate-effect="fadeIn"
            >
              <h1>{f.titre}</h1>
              <p className="sub">{f.sousTitre}</p>
            </div>
          </div>
          <div className="row">
            {/* Colonne de gauche : humaine, spirituelle */}
            <div className="col-md-6">{dimensions.slice(0, 2).map(renderCard)}</div>
            {/* Colonne de droite : intellectuelle, pastorale */}
            <div className="col-md-6">{dimensions.slice(2).map(renderCard)}</div>
          </div>
        </div>
      </section>

      <SidePanel
        isOpen={openIndex !== null}
        onClose={close}
        eyebrow={f.eyebrow(lastIndex + 1, dimensions.length)}
        title={current.fullTitle}
        footer={
          <>
            {prev && (
              <button type="button" className="panel-nav-btn" onClick={() => open(lastIndex - 1)}>
                <small>{f.precedente}</small>
                <span>{prev.title}</span>
              </button>
            )}
            {next && (
              <button type="button" className="panel-nav-btn panel-nav-btn--next" onClick={() => open(lastIndex + 1)}>
                <small>{f.suivante}</small>
                <span>{next.title}</span>
              </button>
            )}
          </>
        }
      >
        <PanelBlocks blocks={current.blocks} />
      </SidePanel>
    </>
  );
};

export default Practice;
