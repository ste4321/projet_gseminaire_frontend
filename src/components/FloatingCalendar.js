import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import SidePanel from "./SidePanel";
import { API_URL } from "../config";
import { getEcho } from "../realtime";
import { useLangue } from "../i18n";

// ---------------------------------------------------------------
// Calendrier académique : saisi dans l'administration (projet_gseminaire_gestion,
// « Calendrier académique ») et lu sur GET /api/calendrier :
// { annee, semestres: [{ titre, debut, fin, evenements: [{ id, date, end, join, label }] }] }, ou null.
// Dates au format AAAA-MM-JJ ; « end » + « join » : "du" (période) ou "et" (deux jours).
// Rechargé à chaque ouverture du panneau et en direct (canal « calendrier ») après une modification.
// ---------------------------------------------------------------

// --- Mise en forme des dates, dans la langue choisie ------------
// l : { date, periode, majuscule } fournis par useLangue() (i18n/index.js)

const fmt = (l, iso, options) => l.date(new Date(`${iso}T00:00:00Z`), { timeZone: "UTC", ...options });

const formatEventDate = (l, { date, end, join }) => {
  if (!end) return l.majuscule(fmt(l, date, { weekday: "long", day: "numeric", month: "long" }));
  const sameMonth = date.slice(0, 7) === end.slice(0, 7);
  if (join === "et") {
    const first = fmt(l, date, sameMonth ? { weekday: "long", day: "numeric" } : { weekday: "long", day: "numeric", month: "long" });
    return l.majuscule(l.periode.et(first, fmt(l, end, { weekday: "long", day: "numeric", month: "long" })));
  }
  const first = fmt(l, date, sameMonth ? { day: "numeric" } : { day: "numeric", month: "long" });
  return l.periode.du(first, fmt(l, end, { day: "numeric", month: "long" }));
};

const formatRange = (l, start, end) =>
  l.periode.du(
    fmt(l, start, { day: "numeric", month: "long", year: "numeric" }),
    fmt(l, end, { day: "numeric", month: "long", year: "numeric" })
  );

// ---------------------------------------------------------------

const FloatingButton = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: rgba(107, 70, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  z-index: 3000;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  /* Sur mobile, le calendrier passe dans la barre du haut (NavCalendarButton) */
  @media (max-width: 768px) {
    display: none;
  }
`;


// Bouton du calendrier sur mobile, à côté du bouton de thème
const NavCalendarButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 10px;
    right: 98px;
    width: 44px;
    height: 44px;
    padding: 0;
    border: none;
    background: none;
    color: #252525;
    cursor: pointer;
    z-index: 2001;
  }
`;


const FloatingCalendar = () => {
  const l = useLangue();
  const c = l.t.calendrier;
  const [showEvents, setShowEvents] = useState(false);
  const [calendrier, setCalendrier] = useState(null);
  const [etat, setEtat] = useState("chargement"); // chargement | pret | erreur

  const charger = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/calendrier`);
      setCalendrier(res.data || null);
      setEtat("pret");
    } catch (e) {
      // Une erreur n'efface pas un calendrier déjà affiché
      setEtat((precedent) => (precedent === "pret" ? precedent : "erreur"));
    }
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  // Ouverture du panneau : on relit, pour montrer la dernière version
  useEffect(() => {
    if (showEvents) charger();
  }, [showEvents, charger]);

  // Direct : l'administration a modifié le calendrier affiché
  useEffect(() => {
    const echo = getEcho();
    if (!echo) return undefined;
    echo.channel("calendrier").listen(".calendrier.maj", charger);
    return () => echo.leaveChannel("calendrier");
  }, [charger]);

  const semesters = calendrier?.semestres || [];
  const academicYear = calendrier?.annee;

  // Événements passés grisés, prochain événement mis en avant
  const today = new Date().toISOString().slice(0, 10);
  const allEvents = semesters.flatMap((semester) => semester.evenements);
  const nextEvent = allEvents.find((event) => (event.end || event.date) >= today);
  const yearIsOver = allEvents.length > 0 && !nextEvent;

  return (
    <>
      {!showEvents && (
        <FloatingButton translate="no" onClick={() => setShowEvents(true)} aria-label={c.titre}>
          <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
        </FloatingButton>
      )}
      <NavCalendarButton
        type="button"
        className="calendar-nav-btn"
        aria-label={c.titre}
        title={c.titre}
        onClick={() => setShowEvents(true)}
      >
        <FontAwesomeIcon icon={faCalendarAlt} style={{ fontSize: 18 }} />
      </NavCalendarButton>

      <SidePanel
        isOpen={showEvents}
        onClose={() => setShowEvents(false)}
        eyebrow={academicYear ? c.annee(academicYear) : c.defaut}
        title={c.titre}
      >
        {etat === "chargement" && <p className="calendar-notice" aria-busy="true">{c.chargement}</p>}
        {etat === "erreur" && (
          <p className="calendar-notice">
            {c.indisponible}{" "}
            <button type="button" className="calendar-retry" onClick={charger}>{c.reessayer}</button>
          </p>
        )}
        {etat === "pret" && semesters.length === 0 && (
          <p className="calendar-notice">{c.bientot}</p>
        )}
        {yearIsOver && (
          <p className="calendar-notice">{c.terminee(academicYear)}</p>
        )}
        {semesters.map((semester) => (
          <section key={semester.titre} className="calendar-semester">
            <h3>{semester.titre}</h3>
            {semester.debut && semester.fin && <p className="calendar-range">{formatRange(l, semester.debut, semester.fin)}</p>}
            <ul className="calendar-list">
              {semester.evenements.map((event) => {
                const isPast = (event.end || event.date) < today;
                const isNext = event === nextEvent;
                return (
                  <li
                    key={event.id}
                    className={`calendar-item${isPast ? " is-past" : ""}${isNext ? " is-next" : ""}`}
                  >
                    <span className="calendar-date">{formatEventDate(l, event)}</span>
                    <span className="calendar-label">{event.label}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </SidePanel>
    </>
  );
};

export default FloatingCalendar;
