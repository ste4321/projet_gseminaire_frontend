import React, { useEffect, useRef, useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import { LANGUES, useLangue } from '../i18n';
import '../styles/langue.css';

/**
 * Bouton « FR ▾ » ouvrant le choix de la langue (français, malagasy, anglais, italien).
 * Chaque langue est écrite dans sa propre langue, pour être reconnue par ceux qui la lisent.
 * className : emplacement (coin de la barre, ou entrée du menu) — voir styles/langue.css.
 */
const LangueSelecteur = ({ className = '' }) => {
  const { langue, setLangue, t } = useLangue();
  const [ouvert, setOuvert] = useState(false);
  const racine = useRef(null);
  const actuelle = LANGUES.find((l) => l.code === langue);

  // Fermeture : clic ailleurs ou Échap
  useEffect(() => {
    if (!ouvert) return undefined;
    const clicDehors = (e) => !racine.current?.contains(e.target) && setOuvert(false);
    const echap = (e) => e.key === 'Escape' && setOuvert(false);
    document.addEventListener('pointerdown', clicDehors);
    document.addEventListener('keydown', echap);
    return () => {
      document.removeEventListener('pointerdown', clicDehors);
      document.removeEventListener('keydown', echap);
    };
  }, [ouvert]);

  return (
    <div className={`langue ${ouvert ? 'is-open' : ''} ${className}`} ref={racine} translate="no">
      <button
        type="button"
        className="langue__bouton"
        onClick={() => setOuvert((o) => !o)}
        aria-haspopup="true"
        aria-expanded={ouvert}
        aria-label={`${t.langue.choisir} (${actuelle.nom})`}
        title={t.langue.choisir}
      >
        <FaGlobe size={15} aria-hidden="true" />
        <span className="langue__code">{actuelle.court}</span>
        <span className="langue__chevron" aria-hidden="true">▾</span>
      </button>
      <ul className="langue__liste" role="menu" aria-label={t.langue.label} hidden={!ouvert}>
        {LANGUES.map((l) => (
          <li key={l.code} role="none">
            <button
              type="button"
              role="menuitemradio"
              aria-checked={l.code === langue}
              lang={l.code}
              className={`langue__choix ${l.code === langue ? 'is-active' : ''}`}
              onClick={() => {
                setLangue(l.code);
                setOuvert(false);
              }}
            >
              <span className="langue__choix-code">{l.court}</span>
              <span className="langue__choix-nom">{l.nom}</span>
              {l.code === langue && <span className="langue__coche" aria-hidden="true">✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LangueSelecteur;
