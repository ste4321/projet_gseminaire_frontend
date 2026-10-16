import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import SidePanel from "./SidePanel";

// ---------------------------------------------------------------
// Calendrier académique : modifier uniquement ces données.
// Dates au format AAAA-MM-JJ ; le jour de la semaine est calculé.
// « end » + « join » : "du" (période) ou "et" (deux jours).
// ---------------------------------------------------------------
const ACADEMIC_YEAR = "2025-2026";

const semesters = [
  {
    title: "Premier semestre",
    start: "2025-09-25",
    end: "2026-02-07",
    events: [
      { date: "2025-09-25", label: "Rentrée des internes" },
      { date: "2025-09-29", label: "Réunion de tous les étudiants à 8 h, puis Messe du Saint-Esprit à 10 h" },
      { date: "2025-10-26", label: "Fête patronale et Ordre mineur" },
      { date: "2025-11-01", label: "La Toussaint (pas de cours)" },
      { date: "2025-12-17", label: "Vacances de Noël (l’après-midi)" },
      { date: "2026-01-03", label: "Rentrée des internes" },
      { date: "2026-01-05", label: "Reprise des cours" },
      { date: "2026-01-22", end: "2026-02-04", join: "du", label: "Examens semestriels" },
      { date: "2026-02-06", end: "2026-02-07", join: "et", label: "Symposium" },
    ],
  },
  {
    title: "Deuxième semestre",
    start: "2026-02-09",
    end: "2026-06-19",
    events: [
      { date: "2026-02-09", label: "Début des cours" },
      { date: "2026-03-26", label: "Vacances de Pâques" },
      { date: "2026-04-09", label: "Rentrée des internes" },
      { date: "2026-04-10", label: "Reprise des cours" },
      { date: "2026-05-14", label: "Ascension (excursion)" },
      { date: "2026-05-17", label: "Sakafom-pitiavana" },
      { date: "2026-05-25", label: "Lundi de Pentecôte" },
      { date: "2026-06-05", end: "2026-06-17", join: "du", label: "Examens semestriels" },
      { date: "2026-06-11", label: "Réunion des éducateurs avec les responsables des foyers" },
      { date: "2026-06-17", label: "Grand oral" },
      { date: "2026-06-18", label: "Réunion des enseignants" },
      { date: "2026-06-19", label: "Clôture de l’année académique par la Sainte Messe" },
      { date: "2026-09-24", label: "Rentrée 2026-2027" },
    ],
  },
];

// --- Mise en forme des dates -----------------------------------

const toDate = (iso) => new Date(`${iso}T00:00:00Z`);
const fmt = (iso, options) =>
  toDate(iso).toLocaleDateString("fr-FR", { timeZone: "UTC", ...options });
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const formatEventDate = ({ date, end, join }) => {
  if (!end) return capitalize(fmt(date, { weekday: "long", day: "numeric", month: "long" }));
  const sameMonth = date.slice(0, 7) === end.slice(0, 7);
  if (join === "et") {
    const first = fmt(date, sameMonth ? { weekday: "long", day: "numeric" } : { weekday: "long", day: "numeric", month: "long" });
    return capitalize(`${first} et ${fmt(end, { weekday: "long", day: "numeric", month: "long" })}`);
  }
  const first = fmt(date, sameMonth ? { day: "numeric" } : { day: "numeric", month: "long" });
  return `Du ${first} au ${fmt(end, { day: "numeric", month: "long" })}`;
};

const formatRange = (start, end) =>
  `Du ${fmt(start, { day: "numeric", month: "long", year: "numeric" })} au ${fmt(end, { day: "numeric", month: "long", year: "numeric" })}`;

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
  const [showEvents, setShowEvents] = useState(false);

  // Événements passés grisés, prochain événement mis en avant
  const today = new Date().toISOString().slice(0, 10);
  const allEvents = semesters.flatMap((semester) => semester.events);
  const nextEvent = allEvents.find((event) => (event.end || event.date) >= today);
  const yearIsOver = !nextEvent;

  return (
    <>
      {!showEvents && (
        <FloatingButton translate="no" onClick={() => setShowEvents(true)} aria-label="Calendrier académique">
          <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
        </FloatingButton>
      )}
      <NavCalendarButton
        type="button"
        className="calendar-nav-btn"
        aria-label="Calendrier académique"
        title="Calendrier académique"
        onClick={() => setShowEvents(true)}
      >
        <FontAwesomeIcon icon={faCalendarAlt} style={{ fontSize: 18 }} />
      </NavCalendarButton>

      <SidePanel
        isOpen={showEvents}
        onClose={() => setShowEvents(false)}
        eyebrow={`Année ${ACADEMIC_YEAR}`}
        title="Calendrier académique"
      >
        {yearIsOver && (
          <p className="calendar-notice">
            L’année académique {ACADEMIC_YEAR} est terminée. Le calendrier de la nouvelle année sera publié prochainement.
          </p>
        )}
        {semesters.map((semester) => (
          <section key={semester.title} className="calendar-semester">
            <h3>{semester.title}</h3>
            <p className="calendar-range">{formatRange(semester.start, semester.end)}</p>
            <ul className="calendar-list">
              {semester.events.map((event) => {
                const isPast = (event.end || event.date) < today;
                const isNext = event === nextEvent;
                return (
                  <li
                    key={`${event.date}-${event.label}`}
                    className={`calendar-item${isPast ? " is-past" : ""}${isNext ? " is-next" : ""}`}
                  >
                    <span className="calendar-date">{formatEventDate(event)}</span>
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
