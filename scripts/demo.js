// `npm run demo` : serveur de développement prêt à être exposé par un tunnel (cloudflared, ngrok).
// Les variables posées ici l'emportent sur .env.development (dotenv n'écrase pas une variable déjà définie).
Object.assign(process.env, {
  // Port 3001 : l'application de gestion utilise déjà le 3000
  PORT: process.env.PORT || '3001',
  // API appelée sur la même adresse que la page, relayée vers Laravel par src/setupProxy.js
  REACT_APP_API_URL: '/api',
  // Pas d'actualités en direct à travers le tunnel : le site se met à jour toutes les 30 s
  REACT_APP_REVERB_KEY: '',
  // Le tunnel présente sa propre adresse (xxx.trycloudflare.com) : sans ceci, « Invalid Host header »
  DANGEROUSLY_DISABLE_HOST_CHECK: 'true',
  // Rechargement à chaud via le port de la page (443 derrière le tunnel), pas 3001
  WDS_SOCKET_PORT: '0',
  BROWSER: 'none',
});

require('react-scripts/scripts/start');
