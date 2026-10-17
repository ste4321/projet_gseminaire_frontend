import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useActualites } from '../contexts/ActualitesContext';
import '../styles/Info.css';

const NB_INITIAL = 7; // 1 à la une + 6 en grille

const jour = (iso) => new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit' });
const mois = (iso) => new Date(iso).toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');
const annee = (iso) => new Date(iso).getFullYear();
const dateComplete = (iso) =>
  new Date(iso).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

const dateRelative = (iso) => {
  const debut = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const ecart = Math.round((debut(new Date()) - debut(new Date(iso))) / 86400000);
  if (ecart <= 0) return "Aujourd'hui";
  if (ecart === 1) return 'Hier';
  if (ecart < 7) return `Il y a ${ecart} jours`;
  return null; // au-delà, le bloc date suffit
};

// Lien partageable : https://…/#actualite-12 ouvre directement l'actualité
const majAncre = (id) => {
  const url = window.location.pathname + window.location.search + (id ? `#actualite-${id}` : '');
  window.history.replaceState(null, '', url);
};

const paragraphes = (texte) => (texte || '').split(/\n+/).map((p) => p.trim()).filter(Boolean);

/** Carte d'actualité (à la une ou en grille) */
const Carte = ({ info, uneDuMoment, nouvelle, fraiche, onOuvrir }) => (
  <article className={`actu-card ${uneDuMoment ? 'actu-card--une' : ''} ${fraiche ? 'is-fresh' : ''}`}>
    <button type="button" className="actu-card__btn" onClick={() => onOuvrir(info)} aria-label={`Lire : ${info.titre}`}>
      <div className="actu-date" aria-hidden="true">
        <span className="actu-date__jour">{jour(info.created_at)}</span>
        <span className="actu-date__mois">{mois(info.created_at)}</span>
        {(uneDuMoment || annee(info.created_at) !== new Date().getFullYear()) && (
          <span className="actu-date__annee">{annee(info.created_at)}</span>
        )}
      </div>

      <div className="actu-card__corps">
        <div className="actu-card__meta">
          {uneDuMoment && <span className="actu-pill actu-pill--une">À la une</span>}
          {nouvelle && <span className="actu-pill actu-pill--new">Nouveau</span>}
          {dateRelative(info.created_at) && <time dateTime={info.created_at}>{dateRelative(info.created_at)}</time>}
        </div>
        <h3 className="actu-card__titre">{info.titre}</h3>
        {info.description && <p className="actu-card__extrait">{info.description}</p>}
        <div className="actu-card__pied">
          <span className="actu-card__auteur">{info.auteur}</span>
          <span className="actu-card__lire">
            Lire la suite
            <svg width="14" height="14" viewBox="0 0 15 15" aria-hidden="true">
              <path d="M8.146 3.146a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L11.293 8H2.5a.5.5 0 0 1 0-1h8.793L8.146 3.854a.5.5 0 0 1 0-.708z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  </article>
);

const Info = () => {
  const {
    infos, loading, error, recharger, vues, marquerLue, toutMarquerLu, nonLues,
    enDirect, arrivee, effacerArrivee, fraiches,
  } = useActualites();
  const [ouverte, setOuverte] = useState(null);
  const [toutAfficher, setToutAfficher] = useState(false);
  const [visible, setVisible] = useState(false); // animation d'ouverture de la lecture
  const declencheur = useRef(null);
  const boutonFermer = useRef(null);

  const ouvrir = (info) => {
    declencheur.current = document.activeElement;
    setOuverte(info);
    marquerLue(info.id);
    majAncre(info.id);
  };
  const fermer = useCallback(() => {
    setOuverte(null);
    majAncre(null);
  }, []);

  const ancreTraitee = useRef(false);
  useEffect(() => {
    if (ancreTraitee.current || loading) return;
    ancreTraitee.current = true;
    const m = window.location.hash.match(/^#actualite-(\d+)$/);
    const info = m && infos.find((i) => i.id === Number(m[1]));
    if (info) {
      document.getElementById('gtco-info')?.scrollIntoView();
      setOuverte(info);
      marquerLue(info.id);
    }
  }, [loading, infos, marquerLue]);

  // L'actualité ouverte suit les modifications reçues en direct ; fermée si supprimée
  useEffect(() => {
    if (!ouverte) return;
    const aJour = infos.find((i) => i.id === ouverte.id);
    if (!aJour) setOuverte(null);
    else if (aJour !== ouverte) setOuverte(aJour);
  }, [infos, ouverte]);

  // Fenêtre de lecture : blocage du défilement, boutons flottants masqués, focus, Échap
  const ouverteId = ouverte?.id;
  useEffect(() => {
    if (!ouverteId) {
      setVisible(false);
      return undefined;
    }
    // Classe CSS : défilement bloqué et boutons flottants (calendrier, thème, menu, haut de page) masqués
    document.body.classList.add('actu-lecture-ouverte');
    const t = setTimeout(() => {
      setVisible(true);
      boutonFermer.current?.focus();
    }, 10);
    const surTouche = (e) => e.key === 'Escape' && fermer();
    document.addEventListener('keydown', surTouche);

    return () => {
      clearTimeout(t);
      document.body.classList.remove('actu-lecture-ouverte');
      document.removeEventListener('keydown', surTouche);
      declencheur.current?.focus?.();
    };
  }, [ouverteId, fermer]);

  // Annonce d'une actualité arrivée en direct : disparaît seule après 10 s
  useEffect(() => {
    if (!arrivee) return undefined;
    const t = setTimeout(effacerArrivee, 10000);
    return () => clearTimeout(t);
  }, [arrivee, effacerArrivee]);

  const lireArrivee = () => {
    const info = infos.find((i) => i.id === arrivee?.id);
    effacerArrivee();
    if (info) ouvrir(info);
  };

  const [une, ...autres] = infos;
  const affichees = toutAfficher ? autres : autres.slice(0, NB_INITIAL - 1);
  const masquees = autres.length - affichees.length;

  return (
    <section id="gtco-info" data-section="info" aria-labelledby="actu-titre">
      <div className="container">
        <div className="row row-pb-md">
          <div className="col-md-8 col-md-offset-2 heading text-center">
            <span className="actu-surtitre">Vie du séminaire</span>
            <h1 id="actu-titre">Actualités</h1>
            <p className="sub">Les annonces et informations publiées par le Grand Séminaire de Faliarivo.</p>

            {!loading && !error && infos.length > 0 && (
              <div className="actu-statut">
                {enDirect && (
                  <span className="actu-direct" title="Les nouvelles actualités apparaissent sans recharger la page">
                    <span className="actu-direct__point" aria-hidden="true"></span>En direct
                  </span>
                )}
                {nonLues > 0 ? (
                  <>
                    <span>{nonLues} non lue{nonLues > 1 ? 's' : ''}</span>
                    <button type="button" className="actu-lien" onClick={toutMarquerLu}>Tout marquer comme lu</button>
                  </>
                ) : (
                  <span>Vous êtes à jour</span>
                )}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="actu-grille" aria-busy="true" aria-label="Chargement des actualités">
            {[0, 1, 2].map((i) => <div key={i} className="actu-card actu-card--squelette" />)}
          </div>
        ) : error ? (
          <div className="actu-vide">
            <p>{error}</p>
            <button type="button" className="actu-bouton" onClick={recharger}>Réessayer</button>
          </div>
        ) : infos.length === 0 ? (
          <div className="actu-vide">
            <p>Aucune actualité pour le moment. Revenez bientôt !</p>
          </div>
        ) : (
          <>
            <Carte info={une} uneDuMoment nouvelle={!vues.has(une.id)} fraiche={fraiches.has(une.id)} onOuvrir={ouvrir} />

            {affichees.length > 0 && (
              <div className="actu-grille">
                {affichees.map((info) => (
                  <Carte key={info.id} info={info} nouvelle={!vues.has(info.id)} fraiche={fraiches.has(info.id)} onOuvrir={ouvrir} />
                ))}
              </div>
            )}

            {(masquees > 0 || toutAfficher) && autres.length > NB_INITIAL - 1 && (
              <div className="text-center">
                <button type="button" className="actu-bouton" onClick={() => setToutAfficher(!toutAfficher)} aria-expanded={toutAfficher}>
                  {toutAfficher ? 'Afficher moins' : `Voir toutes les actualités (${masquees} de plus)`}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Annonce en direct d'une nouvelle actualité */}
      <div className="actu-toast-zone" aria-live="polite">
        {arrivee && (
          <div className="actu-toast" role="status">
            <span className="actu-toast__icone" aria-hidden="true">✦</span>
            <div className="actu-toast__texte">
              <strong>Nouvelle actualité</strong>
              <span>{arrivee.titre}</span>
            </div>
            <button type="button" className="actu-toast__lire" onClick={lireArrivee}>Lire</button>
            <button type="button" className="actu-toast__fermer" onClick={effacerArrivee} aria-label="Fermer l'annonce">×</button>
          </div>
        )}
      </div>

      {/* Lecture d'une actualité */}
      {ouverte && (
        <div className={`actu-overlay ${visible ? 'is-visible' : ''}`} onClick={fermer}>
          <div
            className="actu-lecture"
            role="dialog"
            aria-modal="true"
            aria-labelledby="actu-lecture-titre"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="actu-lecture__entete">
              <span className="actu-surtitre">{dateComplete(ouverte.created_at)}</span>
              <button ref={boutonFermer} type="button" className="actu-lecture__fermer" onClick={fermer} aria-label="Fermer">×</button>
            </header>
            <div className="actu-lecture__contenu">
              <h2 id="actu-lecture-titre">{ouverte.titre}</h2>
              <p className="actu-lecture__auteur">Par {ouverte.auteur}</p>
              <div className="actu-lecture__texte">
                {paragraphes(ouverte.description).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <footer className="actu-lecture__pied">
              <button type="button" className="actu-bouton" onClick={fermer}>Fermer</button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};

export default Info;
