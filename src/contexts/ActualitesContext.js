// Actualités du site vitrine, partagées entre le menu (badge « Info ») et la section Actualités.
// - un seul chargement pour toute la page
// - mises à jour en direct par WebSocket (publication, modification, suppression)
// - repli sans WebSocket : rafraîchissement toutes les 2 minutes et au retour sur l'onglet
// - « lu / non lu » mémorisé dans le navigateur du visiteur
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { getEcho, onConnectionChange, realtimeEnabled } from '../realtime';
import { getCookie, setCookie } from '../utils/cookie';

const ActualitesContext = createContext(null);

const STORAGE_KEY = 'viewedInfos';
const POLL_MS = 2 * 60 * 1000;

const lireVues = () => {
  try {
    const brut = localStorage.getItem(STORAGE_KEY) || getCookie(STORAGE_KEY);
    return new Set(brut ? JSON.parse(brut) : []);
  } catch (e) {
    return new Set();
  }
};

const trier = (liste) => [...liste].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

export const ActualitesProvider = ({ children }) => {
  const [infos, setInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vues, setVues] = useState(lireVues);
  const [connexion, setConnexion] = useState(realtimeEnabled ? 'connecting' : 'disabled');
  const [arrivee, setArrivee] = useState(null); // dernière actualité reçue en direct (pour l'annonce)
  const [fraiches, setFraiches] = useState(() => new Set()); // ids à mettre en évidence
  const premierChargement = useRef(true);

  const charger = useCallback(async () => {
    if (premierChargement.current) setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/infos`);
      setInfos(trier(res.data));
      setError(null);
    } catch (e) {
      // Erreur affichée seulement si rien n'a encore pu être chargé
      if (premierChargement.current) setError('Les actualités ne sont pas disponibles pour le moment.');
    } finally {
      premierChargement.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

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
        setInfos((liste) => liste.filter((i) => i.id !== info.id));
        return;
      }
      setInfos((liste) => trier([info, ...liste.filter((i) => i.id !== info.id)]));
      if (action === 'creee') {
        setArrivee(info);
        setFraiches((s) => new Set(s).add(info.id));
        setTimeout(() => setFraiches((s) => {
          const copie = new Set(s);
          copie.delete(info.id);
          return copie;
        }), 8000);
      }
    });

    return () => {
      stopEtat();
      echo.leaveChannel('actualites');
    };
  }, [charger]);

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

  const toutMarquerLu = useCallback(() => {
    setVues((s) => new Set([...s, ...infos.map((i) => i.id)]));
  }, [infos]);

  const nonLues = useMemo(() => infos.filter((i) => !vues.has(i.id)).length, [infos, vues]);

  const value = useMemo(() => ({
    infos, loading, error, recharger: charger,
    vues, marquerLue, toutMarquerLu, nonLues,
    enDirect: connexion === 'connected',
    arrivee, effacerArrivee: () => setArrivee(null),
    fraiches,
  }), [infos, loading, error, charger, vues, marquerLue, toutMarquerLu, nonLues, connexion, arrivee, fraiches]);

  return <ActualitesContext.Provider value={value}>{children}</ActualitesContext.Provider>;
};

export const useActualites = () => {
  const context = useContext(ActualitesContext);
  if (!context) throw new Error('useActualites doit être utilisé dans <ActualitesProvider>');
  return context;
};
