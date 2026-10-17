// Connexion WebSocket au serveur Laravel Reverb (protocole Pusher).
// Sans clé configurée (REACT_APP_REVERB_KEY vide), le direct est désactivé :
// le site se rabat sur un rafraîchissement périodique (voir ActualitesContext).
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const KEY = process.env.REACT_APP_REVERB_KEY;
const SCHEME = process.env.REACT_APP_REVERB_SCHEME || 'https';

let echo = null;

export const realtimeEnabled = Boolean(KEY);

export const getEcho = () => {
  if (!realtimeEnabled) return null;
  if (!echo) {
    window.Pusher = Pusher;
    const port = Number(process.env.REACT_APP_REVERB_PORT) || (SCHEME === 'https' ? 443 : 80);
    echo = new Echo({
      broadcaster: 'reverb',
      key: KEY,
      wsHost: process.env.REACT_APP_REVERB_HOST || window.location.hostname,
      wsPort: port,
      wssPort: port,
      forceTLS: SCHEME === 'https',
      enabledTransports: ['ws', 'wss'],
      disableStats: true,
    });
  }
  return echo;
};

/** État de la connexion : 'connected', 'connecting', 'unavailable', 'disconnected'… */
export const onConnectionChange = (callback) => {
  const instance = getEcho();
  if (!instance) return () => {};
  const connection = instance.connector.pusher.connection;
  const handler = ({ current }) => callback(current);
  connection.bind('state_change', handler);
  callback(connection.state);
  return () => connection.unbind('state_change', handler);
};
