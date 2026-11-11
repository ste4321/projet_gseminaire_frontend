import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useActualites } from '../contexts/ActualitesContext';
import '../styles/Info.css';
import { useLangue } from '../i18n';

const NB_INITIAL = 7; // 1 à la une + 6 en grille (une page du serveur, voir ActualitesContext)
const DUREE_FERMETURE = 300; // ms, aligné sur la transition de sortie (Info.css)
const DUREE_ENTREE = 1600; // ms, cascade d'apparition complète des cartes

const annee = (iso) => new Date(iso).getFullYear();

// a : textes des actualités dans la langue choisie (i18n, clé « actus »)
const dateRelative = (iso, a) => {
  const debut = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const ecart = Math.round((debut(new Date()) - debut(new Date(iso))) / 86400000);
  if (ecart <= 0) return a.aujourdhui;
  if (ecart === 1) return a.hier;
  if (ecart < 7) return a.ilYa(ecart);
  return null; // au-delà, le bloc date suffit
};

// Lien partageable : https://…/#actualite-12 ouvre directement l'actualité
const majAncre = (id) => {
  const url = window.location.pathname + window.location.search + (id ? `#actualite-${id}` : '');
  window.history.replaceState(null, '', url);
};

const paragraphes = (texte) => (texte || '').split(/\n+/).map((p) => p.trim()).filter(Boolean);

// Décalage du centre d'une carte visible par rapport au centre de l'écran :
// la fenêtre de lecture s'ouvre depuis la carte et y retourne à la fermeture
const origineDepuisCarte = (id) => {
  const r = document.querySelector(`[data-actu-id="${id}"]`)?.getBoundingClientRect();
  if (!r || r.bottom < 0 || r.top > window.innerHeight) return null;
  return {
    '--actu-dx': `${Math.round(r.left + r.width / 2 - window.innerWidth / 2)}px`,
    '--actu-dy': `${Math.round(r.top + r.height / 2 - window.innerHeight / 2)}px`,
  };
};

const FOCUSABLES = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

/** Carte d'actualité (à la une ou en grille) */
const Carte = ({ info, uneDuMoment, nouvelle, fraiche, ordre, onOuvrir }) => {
  const { t, date } = useLangue();
  const a = t.actus;
  const relative = dateRelative(info.created_at, a);
  return (
  <article
    className={`actu-card actu-reveal ${uneDuMoment ? 'actu-card--une' : ''} ${fraiche ? 'is-fresh' : ''}`}
    data-actu-id={info.id}
    style={{ '--i': ordre }}
  >
    <button type="button" className="actu-card__btn" onClick={() => onOuvrir(info)} aria-label={a.lireAria(info.titre)}>
      <div className="actu-date" aria-hidden="true">
        <span className="actu-date__jour">{date(info.created_at, { day: '2-digit' })}</span>
        <span className="actu-date__mois">{date(info.created_at, { month: 'short' })}</span>
        {(uneDuMoment || annee(info.created_at) !== new Date().getFullYear()) && (
          <span className="actu-date__annee">{annee(info.created_at)}</span>
        )}
      </div>

      <div className="actu-card__corps">
        <div className="actu-card__meta">
          {uneDuMoment && <span className="actu-pill actu-pill--une">{a.aLaUne}</span>}
          {nouvelle && <span className="actu-pill actu-pill--new">{a.nouveau}</span>}
          {relative && <time dateTime={info.created_at}>{relative}</time>}
        </div>
        <h3 className="actu-card__titre">{info.titre}</h3>
        {info.description && <p className="actu-card__extrait">{info.description}</p>}
        <div className="actu-card__pied">
          <span className="actu-card__auteur">{info.auteur}</span>
          <span className="actu-card__lire">
            {a.lireSuite}
            <svg width="14" height="14" viewBox="0 0 15 15" aria-hidden="true">
              <path d="M8.146 3.146a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L11.293 8H2.5a.5.5 0 0 1 0-1h8.793L8.146 3.854a.5.5 0 0 1 0-.708z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  </article>
  );
};

const Info = () => {
  const { t, date } = useLangue();
  const a = t.actus;
  const {
    infos, total, loading, error, recharger, estVue, marquerLue, toutMarquerLu, nonLues,
    plusDisponibles, chargerPlus, chargementPlus, chargerUne,
    enDirect, arrivee, effacerArrivee, fraiches,
  } = useActualites();
  const [ouverte, setOuverte] = useState(null);
  const [toutAfficher, setToutAfficher] = useState(false);
  const [visible, setVisible] = useState(false); // fenêtre de lecture affichée (pilote les transitions)
  const [origine, setOrigine] = useState(null); // position de la carte d'où part la fenêtre
  const [progression, setProgression] = useState(null); // lecture de 0 à 1, null si rien à faire défiler
  const [revelee, setRevelee] = useState(false); // la section est entrée dans l'écran
  const [entreeFinie, setEntreeFinie] = useState(false);
  const section = useRef(null);
  const fenetre = useRef(null);
  const contenu = useRef(null);
  const declencheur = useRef(null);
  const boutonFermer = useRef(null);
  const minuterieFermeture = useRef(null);
  const ouverteRef = useRef(null);
  ouverteRef.current = ouverte;

  // ---------- Apparition en cascade à la première arrivée sur la section ----------
  useEffect(() => {
    if (revelee) return undefined;
    const el = section.current;
    if (!el || !('IntersectionObserver' in window)) {
      setRevelee(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevelee(true);
          obs.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [revelee]);

  // Une fois la cascade jouée (données chargées), les classes d'animation sont retirées
  useEffect(() => {
    if (!revelee || loading || entreeFinie) return undefined;
    const t = setTimeout(() => setEntreeFinie(true), DUREE_ENTREE);
    return () => clearTimeout(t);
  }, [revelee, loading, entreeFinie]);

  // ---------- Lecture ----------
  const afficher = (info) => {
    setOuverte(info);
    marquerLue(info.id);
    majAncre(info.id);
  };

  const ouvrir = (info) => {
    if (minuterieFermeture.current) {
      // Réouverture pendant l'animation de fermeture
      clearTimeout(minuterieFermeture.current);
      minuterieFermeture.current = null;
      setVisible(true);
    }
    declencheur.current = document.activeElement;
    setOrigine(origineDepuisCarte(info.id));
    afficher(info);
  };

  const fermer = useCallback(() => {
    if (!ouverteRef.current || minuterieFermeture.current) return;
    setOrigine(origineDepuisCarte(ouverteRef.current.id));
    setVisible(false); // lance la transition de sortie ; démontage à la fin
    majAncre(null);
    minuterieFermeture.current = setTimeout(() => {
      minuterieFermeture.current = null;
      setOuverte(null);
    }, DUREE_FERMETURE);
  }, []);

  useEffect(() => () => clearTimeout(minuterieFermeture.current), []);

  const ancreTraitee = useRef(false);
  useEffect(() => {
    if (ancreTraitee.current || loading) return;
    ancreTraitee.current = true;
    const m = window.location.hash.match(/^#actualite-(\d+)$/);
    if (!m) return;
    const lire = (info) => {
      if (!info) return;
      document.getElementById('gtco-info')?.scrollIntoView();
      setOuverte(info);
      marquerLue(info.id);
    };
    const info = infos.find((i) => i.id === Number(m[1]));
    if (info) lire(info);
    else chargerUne(Number(m[1])).then(lire); // actualité plus ancienne que les pages chargées
  }, [loading, infos, marquerLue, chargerUne]);

  // L'actualité ouverte suit les modifications reçues en direct ; fermée si elle disparaît de la liste
  // (supprimée). Une actualité ouverte par un lien, hors des pages chargées, reste ouverte.
  const idsAvant = useRef(new Set());
  useEffect(() => {
    const ids = new Set(infos.map((i) => i.id));
    if (ouverte) {
      const aJour = infos.find((i) => i.id === ouverte.id);
      if (!aJour && idsAvant.current.has(ouverte.id)) fermer();
      else if (aJour && aJour !== ouverte) setOuverte(aJour);
    }
    idsAvant.current = ids;
  }, [infos, ouverte, fermer]);

  // Navigation entre actualités (liste triée de la plus récente à la plus ancienne)
  const position = ouverte ? infos.findIndex((i) => i.id === ouverte.id) : -1;
  const plusRecente = position > 0 ? infos[position - 1] : null;
  const plusAncienne = position >= 0 && position < infos.length - 1 ? infos[position + 1] : null;
  const aPlusAncienne = Boolean(plusAncienne) || (position === infos.length - 1 && plusDisponibles);
  const [suiteDemandee, setSuiteDemandee] = useState(false); // page suivante en route pour « Plus ancienne »
  const allerPlusAncienne = () => {
    if (plusAncienne) afficher(plusAncienne);
    else if (aPlusAncienne && !suiteDemandee) {
      setSuiteDemandee(true);
      chargerPlus().then((ok) => { if (!ok) setSuiteDemandee(false); });
    }
  };
  useEffect(() => {
    if (!suiteDemandee || !plusAncienne) return;
    setSuiteDemandee(false);
    afficher(plusAncienne);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suiteDemandee, plusAncienne]);

  const actions = useRef({});
  actions.current = { fermer, afficher, plusRecente, aPlusAncienne, allerPlusAncienne };

  // Fenêtre de lecture : blocage du défilement, boutons flottants masqués, focus, clavier
  const estOuverte = Boolean(ouverte);
  useEffect(() => {
    if (!estOuverte) return undefined;
    // Classe CSS : défilement bloqué et boutons flottants (calendrier, thème, menu, haut de page) masqués
    document.body.classList.add('actu-lecture-ouverte');
    // Double rAF : l'état de départ est peint avant de lancer la transition d'entrée
    let r2;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        setVisible(true);
        boutonFermer.current?.focus({ preventScroll: true });
      });
    });

    const surTouche = (e) => {
      const a = actions.current;
      if (e.key === 'Escape') a.fermer();
      else if (e.key === 'ArrowLeft' && a.plusRecente) a.afficher(a.plusRecente);
      else if (e.key === 'ArrowRight' && a.aPlusAncienne) a.allerPlusAncienne();
      else if (e.key === 'Tab' && fenetre.current) {
        // Le focus reste dans la fenêtre
        const elements = [...fenetre.current.querySelectorAll(FOCUSABLES)];
        const premier = elements[0];
        const dernier = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === premier) {
          e.preventDefault();
          dernier.focus();
        } else if (!e.shiftKey && document.activeElement === dernier) {
          e.preventDefault();
          premier.focus();
        }
      }
    };
    document.addEventListener('keydown', surTouche);

    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      setVisible(false);
      document.body.classList.remove('actu-lecture-ouverte');
      document.removeEventListener('keydown', surTouche);
      declencheur.current?.focus?.({ preventScroll: true });
    };
  }, [estOuverte]);

  // Barre de progression de lecture
  const majProgression = () => {
    const el = contenu.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgression(max > 8 ? Math.min(1, el.scrollTop / max) : null);
  };
  const ouverteId = ouverte?.id;
  const ouverteTexte = ouverte?.description;
  useEffect(() => {
    if (ouverteId) majProgression();
  }, [ouverteId, ouverteTexte]);

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
  // Pas encore affichées : chargées mais repliées, ou encore sur le serveur
  const restantes = Math.max(0, total - 1 - affichees.length);
  const voirPlus = () => {
    if (restantes === 0) {
      setToutAfficher(false); // « Afficher moins »
      return;
    }
    const dejaChargees = !toutAfficher && autres.length > NB_INITIAL - 1;
    setToutAfficher(true);
    if (!dejaChargees) chargerPlus();
  };

  const classesSection = [!entreeFinie && 'actu-entree', revelee && 'is-revealed'].filter(Boolean).join(' ');

  return (
    <section ref={section} id="gtco-info" className={classesSection || undefined} data-section="info" aria-labelledby="actu-titre">
      <div className="container">
        <div className="row row-pb-md">
          <div className="col-md-8 col-md-offset-2 heading text-center">
            <span className="actu-surtitre actu-reveal" style={{ '--i': 0 }}>{a.surtitre}</span>
            <h1 id="actu-titre" className="actu-reveal" style={{ '--i': 1 }}>{a.titre}</h1>
            <p className="sub actu-reveal" style={{ '--i': 2 }}>{a.sousTitre}</p>

            {!loading && !error && infos.length > 0 && (
              <div className="actu-statut actu-reveal" style={{ '--i': 3 }}>
                {enDirect && (
                  <span className="actu-direct" title={a.enDirectTitre}>
                    <span className="actu-direct__point" aria-hidden="true"></span>{a.enDirect}
                  </span>
                )}
                {nonLues > 0 ? (
                  <>
                    <span>{a.nonLues(nonLues)}</span>
                    <button type="button" className="actu-lien" onClick={toutMarquerLu}>{a.toutLu}</button>
                  </>
                ) : (
                  <span>{a.aJour}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="actu-grille" aria-busy="true" aria-label={a.chargement}>
            {[0, 1, 2].map((i) => <div key={i} className="actu-card actu-card--squelette" />)}
          </div>
        ) : error ? (
          <div className="actu-vide actu-reveal" style={{ '--i': 3 }}>
            <p>{a.indisponible}</p>
            <button type="button" className="actu-bouton" onClick={recharger}>{a.reessayer}</button>
          </div>
        ) : infos.length === 0 ? (
          <div className="actu-vide actu-reveal" style={{ '--i': 3 }}>
            <p>{a.vide}</p>
          </div>
        ) : (
          <>
            <Carte info={une} uneDuMoment nouvelle={!estVue(une)} fraiche={fraiches.has(une.id)} ordre={4} onOuvrir={ouvrir} />

            {affichees.length > 0 && (
              <div className="actu-grille">
                {affichees.map((info, i) => (
                  <Carte
                    key={info.id}
                    info={info}
                    nouvelle={!estVue(info)}
                    fraiche={fraiches.has(info.id)}
                    ordre={5 + Math.min(i, 5)}
                    onOuvrir={ouvrir}
                  />
                ))}
              </div>
            )}

            {(restantes > 0 || (toutAfficher && autres.length > NB_INITIAL - 1)) && (
              <div className="text-center actu-reveal" style={{ '--i': 9 }}>
                <button type="button" className="actu-bouton" onClick={voirPlus} disabled={chargementPlus}
                  aria-expanded={toutAfficher} aria-busy={chargementPlus}>
                  {chargementPlus ? a.chargement : restantes > 0 ? a.voirPlus(restantes) : a.afficherMoins}
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
              <strong>{a.nouvelle}</strong>
              <span>{arrivee.titre}</span>
            </div>
            <button type="button" className="actu-toast__lire" onClick={lireArrivee}>{a.lire}</button>
            <button type="button" className="actu-toast__fermer" onClick={effacerArrivee} aria-label={a.fermerAnnonce}>×</button>
          </div>
        )}
      </div>

      {/* Lecture d'une actualité */}
      {ouverte && (
        <div className={`actu-overlay ${visible ? 'is-visible' : ''}`} style={origine || undefined} onClick={fermer}>
          <div
            ref={fenetre}
            className="actu-lecture"
            role="dialog"
            aria-modal="true"
            aria-labelledby="actu-lecture-titre"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="actu-lecture__entete">
              <span className="actu-surtitre">{date(ouverte.created_at, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              {infos.length > 1 && (
                <span className="actu-lecture__position">{position + 1} / {infos.length}</span>
              )}
              <button ref={boutonFermer} type="button" className="actu-lecture__fermer" onClick={fermer} aria-label={a.fermer}>×</button>
              {progression !== null && (
                <span className="actu-lecture__progression" style={{ transform: `scaleX(${progression})` }} aria-hidden="true" />
              )}
            </header>
            {/* key : changer d'actualité remonte le contenu en haut, avec un fondu */}
            <div key={ouverte.id} ref={contenu} className="actu-lecture__contenu" onScroll={majProgression}>
              <h2 id="actu-lecture-titre">{ouverte.titre}</h2>
              <p className="actu-lecture__auteur">{a.par(ouverte.auteur)}</p>
              <div className="actu-lecture__texte">
                {paragraphes(ouverte.description).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <footer className="actu-lecture__pied">
              {total > 1 && (
                <button
                  type="button"
                  className="actu-lecture__nav"
                  onClick={() => afficher(plusRecente)}
                  disabled={!plusRecente}
                  title={plusRecente?.titre}
                >
                  <span aria-hidden="true">‹</span> {a.plusRecente}
                </button>
              )}
              <button type="button" className="actu-bouton actu-lecture__fermer-bas" onClick={fermer}>{a.fermer}</button>
              {total > 1 && (
                <button
                  type="button"
                  className="actu-lecture__nav"
                  onClick={allerPlusAncienne}
                  disabled={!aPlusAncienne || suiteDemandee}
                  title={plusAncienne?.titre}
                >
                  {a.plusAncienne} <span aria-hidden="true">›</span>
                </button>
              )}
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};

export default Info;
