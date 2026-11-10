import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import fr from './fr';
import mg from './mg';
import en from './en';
import it from './it';

// Langues du site : chaque fichier (fr.js, mg.js, en.js, it.js) a exactement la même structure.
// Le choix du visiteur est gardé dans ce navigateur ; par défaut, le site s'affiche en français.
export const LANGUES = [
  { code: 'fr', nom: 'Français', court: 'FR' },
  { code: 'mg', nom: 'Malagasy', court: 'MG' },
  { code: 'en', nom: 'English', court: 'EN' },
  { code: 'it', nom: 'Italiano', court: 'IT' },
];
const TEXTES = { fr, mg, en, it };
const CLE = 'langue';
const PAR_DEFAUT = 'fr';

// ---------- Dates ----------
// Les navigateurs ne savent pas écrire les dates en malgache : noms des jours et des mois fournis ici.
const LOCALES = { fr: 'fr-FR', en: 'en-GB', it: 'it-IT' };
const MG_JOURS = ['Alahady', 'Alatsinainy', 'Talata', 'Alarobia', 'Alakamisy', 'Zoma', 'Sabotsy'];
const MG_MOIS = ['Janoary', 'Febroary', 'Martsa', 'Aprily', 'Mey', 'Jona', 'Jolay', 'Aogositra', 'Septambra', 'Oktobra', 'Novambra', 'Desambra'];
const MG_MOIS_COURT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mey', 'Jon', 'Jol', 'Aog', 'Sep', 'Okt', 'Nov', 'Des'];

const majuscule = (texte) => texte.charAt(0).toUpperCase() + texte.slice(1);

/**
 * Date mise en forme dans la langue choisie.
 * options : { weekday: 'long', day: 'numeric' | '2-digit', month: 'long' | 'short', year: 'numeric', timeZone }
 */
const formaterDate = (langue, date, options) => {
  const d = date instanceof Date ? date : new Date(date);
  if (langue !== 'mg') {
    return d.toLocaleDateString(LOCALES[langue] || LOCALES.fr, options).replace('.', '');
  }
  const utc = options.timeZone === 'UTC';
  const jourSemaine = utc ? d.getUTCDay() : d.getDay();
  const jour = utc ? d.getUTCDate() : d.getDate();
  const mois = utc ? d.getUTCMonth() : d.getMonth();
  const an = utc ? d.getUTCFullYear() : d.getFullYear();
  return [
    options.weekday && MG_JOURS[jourSemaine],
    options.day && (options.day === '2-digit' ? String(jour).padStart(2, '0') : jour),
    options.month && (options.month === 'short' ? MG_MOIS_COURT[mois] : MG_MOIS[mois]),
    options.year && an,
  ].filter(Boolean).join(' ');
};

// Périodes du calendrier : « du … au … » et « … et … » selon la langue
const elision = (texte, base) => (/^(1|8|11)\b/.test(texte) ? `${base}ll’${texte}` : `${base}l ${texte}`);
const PERIODES = {
  fr: { du: (a, b) => `Du ${a} au ${b}`, et: (a, b) => `${a} et ${b}` },
  en: { du: (a, b) => `From ${a} to ${b}`, et: (a, b) => `${a} and ${b}` },
  it: { du: (a, b) => `${majuscule(elision(a, 'da'))} ${elision(b, 'a')}`, et: (a, b) => `${a} e ${b}` },
  mg: { du: (a, b) => `Manomboka ny ${a} ka hatramin’ny ${b}`, et: (a, b) => `${a} sy ${b}` },
};

// ---------- Contexte ----------
const lireLangue = () => {
  try {
    const code = localStorage.getItem(CLE);
    return TEXTES[code] ? code : PAR_DEFAUT;
  } catch {
    return PAR_DEFAUT; // stockage bloqué (navigation privée…)
  }
};

const LangueContext = createContext(null);

export const LangueProvider = ({ children }) => {
  const [langue, setLangueEtat] = useState(lireLangue);

  useEffect(() => {
    document.documentElement.lang = langue;
  }, [langue]);

  const setLangue = useCallback((code) => {
    if (!TEXTES[code]) return;
    try {
      localStorage.setItem(CLE, code);
    } catch {
      // stockage bloqué : le choix vaut pour cette visite seulement
    }
    setLangueEtat(code);
  }, []);

  const valeur = useMemo(
    () => ({
      langue,
      setLangue,
      t: TEXTES[langue],
      date: (d, options) => formaterDate(langue, d, options),
      periode: PERIODES[langue],
      majuscule,
    }),
    [langue, setLangue]
  );

  return <LangueContext.Provider value={valeur}>{children}</LangueContext.Provider>;
};

/** { langue, setLangue, t (textes de la langue), date(d, options), periode.du / periode.et, majuscule } */
export const useLangue = () => useContext(LangueContext);
