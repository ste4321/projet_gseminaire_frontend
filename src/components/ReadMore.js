import React, { useState } from 'react';
import SidePanel from './SidePanel';
import { useLangue } from '../i18n';

// Textes (histoire complète et repères) : i18n/<langue>.js, clé « histoire »

const ReadMore = ({ isOpen, onRequestClose }) => {
  const [showFullStory, setShowFullStory] = useState(false);
  const { t } = useLangue();
  const h = t.histoire;
  const paragraphs = h.paragraphes;

  return (
    <SidePanel
      isOpen={isOpen}
      onClose={onRequestClose}
      eyebrow={h.eyebrow}
      title={h.titre}
    >
      <figure className="panel-figure">
        <img src="images/cc.webp" alt={h.imageAlt} loading="lazy" />
        <figcaption>{h.legende}</figcaption>
      </figure>
      <h3 className="panel-heading">{h.reperes}</h3>
      <ol className="milestones">
        {h.jalons.map((item, index) => (
          <li key={item.date} style={{ '--i': index }}>
            <span className="milestones__date">{item.date}</span>
            <span className="milestones__text">{item.text}</span>
          </li>
        ))}
      </ol>

      <h3 className="panel-heading">{h.complete}</h3>
      <p>{paragraphs[0]}</p>
      {/* La suite se déplie en douceur (même animation que « Notre équipe ») */}
      <div className={`expandable ${showFullStory ? 'is-open' : ''}`} inert={!showFullStory}>
        <div className="expandable__inner">
          {paragraphs.slice(1).map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </div>
      <button
        type="button"
        className={`read-toggle ${showFullStory ? 'is-open' : ''}`}
        aria-expanded={showFullStory}
        onClick={() => setShowFullStory((prev) => !prev)}
      >
        {showFullStory ? h.reduire : h.lireTout}
        <span className="read-toggle__icon" aria-hidden="true">↓</span>
      </button>
    </SidePanel>
  );
};

export default ReadMore;
