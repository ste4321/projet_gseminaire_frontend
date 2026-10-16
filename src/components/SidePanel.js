import React, { useEffect, useRef } from 'react';
import '../styles/panel.css';

// Panneau de lecture qui glisse depuis la droite (Formation, Présentation, Calendrier)
const SidePanel = ({ isOpen, onClose, eyebrow, title, children, footer }) => {
  const bodyRef = useRef(null);

  // Bloque le défilement de la page, ferme avec Échap, masque « retour en haut »
  useEffect(() => {
    if (!isOpen) return undefined;
    const gototop = document.querySelector('.gototop');
    document.body.style.overflow = 'hidden';
    if (gototop) gototop.style.display = 'none';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      if (gototop) gototop.style.display = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Revient en haut du texte quand le contenu change (ex. dimension suivante)
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [title]);

  return (
    <div
      className={`side-panel-overlay ${isOpen ? 'is-open' : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <aside
        className="side-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="side-panel__header">
          <div>
            {eyebrow && <p className="side-panel__eyebrow">{eyebrow}</p>}
            <h2 className="side-panel__title">{title}</h2>
          </div>
          <button
            type="button"
            className="side-panel__close"
            onClick={onClose}
            aria-label="Fermer"
          >
            &times;
          </button>
        </header>

        <div className="side-panel__body" ref={bodyRef}>
          {children}
        </div>

        {footer && <footer className="side-panel__footer">{footer}</footer>}
      </aside>
    </div>
  );
};

// Affiche un contenu structuré : paragraphes, citations et listes
export const PanelBlocks = ({ blocks }) =>
  blocks.map((block, i) => {
    if (block.type === 'quote') {
      return (
        <blockquote key={i} className="panel-quote">
          <p>{block.text}</p>
          <cite>{block.source}</cite>
        </blockquote>
      );
    }
    if (block.type === 'list') {
      return (
        <ul key={i} className="panel-list">
          {block.items.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              {item.text}
            </li>
          ))}
        </ul>
      );
    }
    return <p key={i}>{block.text}</p>;
  });

export default SidePanel;
