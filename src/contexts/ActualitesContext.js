// Actualités du site vitrine, partagées entre le menu (badge « Info ») et la section Actualités.
// - chargées par pages : les plus récentes d'abord (une à la une + une grille), puis « Voir plus »
//   charge les suivantes ; l'historique complet ne transite jamais d'un coup
// - mises à jour en direct par WebSocket (publication, modification, suppression)
// - repli sans WebSocket : les actualités affichées sont relues (une seule requête)
//   toutes les 30 secondes et au retour sur l'onglet
// - « lu / non lu » mémorisé dans le navigateur du visiteur
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { getEcho, onConnectionChange, realtimeEnabled } from '../realtime';
import { getCookie, setCookie } from '../utils/cookie';

const ActualitesContext = createContext(null);

const STORAGE_KEY = 'viewedInfos';
const CLE_LU_JUSQUA = 'infosLuesJusqua'; // « Tout marquer comme lu » : tout ce qui est publié avant cette date
const POLL_MS = 30 * 1000;
export const PAR_PAGE = 7; // 1 à la une + 6 en grille, puis 7 de plus à chaque « Voir plus »
const MAX_PAR_REQUETE = 50; // limite du serveur

const lireVues = () => {
  try {
    const brut = localStorage.getItem(STORAGE_KEY) || getCookie(STORAGE_KEY);
    return new Set(brut ? JSON.parse(brut) : []);
  } catch (e) {
    return new Set();
  }
};

const lireLuJusqua = () => {
  try {
    return localStorage.getItem(CLE_LU_JUSQUA) || getCookie(CLE_LU_JUSQUA) || null;
  } catch (e) {
    return null;
  }
};

const instant = (iso) => (iso ? new Date(iso).getTime() : 0);
const trier = (liste) => [...liste].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
// Serveur pas encore mis à jour (liste complète au lieu d'une page) : tout est affiché, comme avant
const lirePage = (params) =>
  axios.get(`${API_URL}/infos`, { params }).then((res) =>
    Array.isArray(res.data) ? { data: params.page > 1 ? [] : res.data, total: res.data.length } : res.data
  );

export const ActualitesProvider = ({ children }) => {
  const [infos, setInfos] = useState([]);
  const [total, setTotal] = useState(0); // nombre d'actualités publiées (toutes pages)
  const [loading, setLoading] = useState(true);
  const [chargementPlus, setChargementPlus] = useState(false);
  const [error, setError] = useState(null);
  const [vues, setVues] = useState(lireVues);
  const [luJusqua, setLuJusqua] = useState(lireLuJusqua);
  const [connexion, setConnexion] = useState(realtimeEnabled ? 'connecting' : 'disabled');
  const [arrivee, setArrivee] = useState(null); // dernière actualité reçue en direct (pour l'annonce)
  const [fraiches, setFraiches] = useState(() => new Set()); // ids à mettre en évidence
  const premierChargement = useRef(true);
  const connues = useRef(new Set()); // ids déjà affichés, pour repérer les nouvelles actualités
  const pagesChargees = useRef(1);

  // Nouvelle actualité (reçue en direct ou découverte à la mise à jour) : annonce + mise en évidence
  const signalerArrivee = useCallback((info) => {
    setArrivee(info);
    setFraiches((s) => new Set(s).add(info.id));
    setTimeout(() => setFraiches((s) => {
      const copie = new Set(s);
      copie.delete(info.id);
      return copie;
    }), 8000);
  }, []);

  // Premier chargement, puis mise à jour : les actualités déjà affichées sont relues en une requête
  const charger = useCallback(async () => {
    if (premierChargement.current) setLoading(true);
    try {
      const parPage = Math.min(MAX_PAR_REQUETE, PAR_PAGE * pagesChargees.current);
      const res = await lirePage({ page: 1, per_page: parPage });
      const liste = trier(res.data);
      // Mode sans direct : une actualité apparue depuis le dernier chargement est annoncée comme en direct
      if (!premierChargement.current) {
        const nouvelles = liste.filter((i) => !connues.current.has(i.id));
        if (nouvelles.length > 0) signalerArrivee(nouvelles[0]);
      }
      liste.forEach((i) => connues.current.add(i.id));
      // Au-delà de la limite d'une requête, les plus anciennes déjà chargées sont gardées telles quelles
      setInfos((avant) => {
        if (PAR_PAGE * pagesChargees.current <= MAX_PAR_REQUETE) return liste;
        const ids = new Set(liste.map((i) => i.id));
        return [...liste, ...avant.slice(liste.length).filter((i) => !ids.has(i.id))];
      });
      setTotal(res.total);
      setError(null);
    } catch (e) {
      // Erreur affichée seulement si rien n'a encore pu être chargé
      if (premierChargement.current) setError('Les actualités ne sont pas disponibles pour le moment.');
    } finally {
      premierChargement.current = false;
      setLoading(false);
    }
  }, [signalerArrivee]);

  useEffect(() => {
    charger();
  }, [charger]);

  /** Page suivante (bouton « Voir plus », ou navigation au-delà de la dernière actualité chargée) */
  const enCoursPlus = useRef(null);
  const chargerPlus = useCallback(() => {
    if (enCoursPlus.current) return enCoursPlus.current;
    setChargementPlus(true);
    const suivante = pagesChargees.current + 1;
    enCoursPlus.current = lirePage({ page: suivante, per_page: PAR_PAGE })
      .then((res) => {
        pagesChargees.current = suivante;
        res.data.forEach((i) => connues.current.add(i.id));
        setInfos((avant) => {
          const ids = new Set(avant.map((i) => i.id));
          return trier([...avant, ...res.data.filter((i) => !ids.has(i.id))]);
        });
        setTotal(res.total);
        return true;
      })
      .catch(() => false) // le bouton reste proposé : un nouvel essai est possible
      .finally(() => {
        enCoursPlus.current = null;
        setChargementPlus(false);
      });
    return enCoursPlus.current;
  }, []);

  /** Une actualité précise, même hors des pages chargées (lien partagé #actualite-12) */
  const chargerUne = useCallback(
    (id) => axios.get(`${API_URL}/infos/${id}`).then((res) => res.data).catch(() => null),
    []
  );

  // Mémorisation des actualités lues (localStorage + cookie, comme avant)
  useEffect(() => {
    const json = JSON.stringify([...vues]);
    try {
      localStorage.setItem(STORAGE_KEY, json);
    } catch (e) {
      // stockage indisponible (navigation privée) : le cookie suffit
    }
    setCookie(STORAGE_KEY, json);
  }, [vues]);

  useEffect(() => {
    if (!luJusqua) return;
    try {
      localStorage.setItem(CLE_LU_JUSQUA, luJusqua);
    } catch (e) {
      // stockage indisponible : le cookie suffit
    }
    setCookie(CLE_LU_JUSQUA, luJusqua);
  }, [luJusqua]);

  // Direct : WebSocket
  useEffect(() => {
    const echo = getEcho();
    if (!echo) return undefined;

    const stopEtat = onConnectionChange((etat) => {
      setConnexion(etat);
      // Reconnexion après une coupure : on rattrape ce qui a pu être manqué
      if (etat === 'connected' && !premierChargement.current) charger();
    });

    echo.channel('actualites').listen('.actualite.maj', ({ action, info }) => {
      if (action === 'supprimee') {
        // Une actualité publiée en moins, qu'elle soit chargée ou non
        setTotal((t) => Math.max(0, t - 1));
        setInfos((liste) => liste.filter((i) => i.id !== info.id));
        return;
      }
      if (action === 'creee' && !connues.current.has(info.id)) {
        connues.current.add(info.id);
        setTotal((t) => t + 1);
        setInfos((liste) => trier([info, ...liste]));
        signalerArrivee(info);
        return;
      }
      // Modification : seulement si l'actualité est affichée (les autres seront lues à jour plus tard)
      setInfos((liste) => liste.map((i) => (i.id === info.id ? info : i)));
    });

    return () => {
      stopEtat();
      echo.leaveChannel('actualites');
    };
  }, [charger, signalerArrivee]);

  // Repli : sans WebSocket connecté, rafraîchissement périodique et au retour sur l'onglet
  useEffect(() => {
    if (connexion === 'connected') return undefined;
    const timer = setInterval(charger, POLL_MS);
    const auRetour = () => document.visibilityState === 'visible' && charger();
    document.addEventListener('visibilitychange', auRetour);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', auRetour);
    };
  }, [connexion, charger]);

  const marquerLue = useCallback((id) => {
    setVues((s) => (s.has(id) ? s : new Set(s).add(id)));
  }, []);

  // Tout ce qui est publié jusqu'à la plus récente actualité compte comme lu,
  // y compris les plus anciennes qui ne sont pas encore chargées
  const toutMarquerLu = useCallback(() => {
    const plusRecente = infos.reduce((max, i) => (instant(i.created_at) > instant(max) ? i.created_at : max), luJusqua);
    if (plusRecente) setLuJusqua(plusRecente);
    setVues((s) => new Set([...s, ...infos.map((i) => i.id)]));
  }, [infos, luJusqua]);

  // Lue : ouverte par le visiteur, ou publiée avant son dernier « Tout marquer comme lu »
  const estVue = useCallback(
    (info) => vues.has(info.id) || (luJusqua && instant(info.created_at) <= instant(luJusqua)),
    [vues, luJusqua]
  );
  const nonLues = useMemo(() => infos.filter((i) => !estVue(i)).length, [infos, estVue]);

  const value = useMemo(() => ({
    infos, total, loading, error, recharger: charger,
    plusDisponibles: total > infos.length, chargerPlus, chargementPlus, chargerUne,
    estVue, marquerLue, toutMarquerLu, nonLues,
    enDirect: connexion === 'connected',
    arrivee, effacerArrivee: () => setArrivee(null),
    fraiches,
  }), [infos, total, loading, error, charger, chargerPlus, chargementPlus, chargerUne, estVue, marquerLue, toutMarquerLu, nonLues, connexion, arrivee, fraiches]);

  return <ActualitesContext.Provider value={value}>{children}</ActualitesContext.Provider>;
};

export const useActualites = () => {
  const context = useContext(ActualitesContext);
  if (!context) throw new Error('useActualites doit être utilisé dans <ActualitesProvider>');
  return context;
};
