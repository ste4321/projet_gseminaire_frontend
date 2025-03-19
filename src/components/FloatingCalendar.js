import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

const FloatingCalendar = () => {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <>
      {/* Bouton flottant (caché si overlay actif) */}
      {!showEvents && (
        <div className="floating-button" onClick={() => setShowEvents(true)}>
          <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
        </div>
      )}

      <div
        className={`overlay ${showEvents ? "active" : ""}`}
        onClick={() => setShowEvents(false)}
      >
        <div
          className="event-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Calendrier des événements</h2>
            <FontAwesomeIcon
              icon={faTimes}
              className="close-btn"
              onClick={() => setShowEvents(false)}
            />
          </div>
          <div className="modal-content">
            <div className="content-section">
              <h3>PREMIER SEMESTRE : 26 septembre 2024 – 08 février 2025</h3>
              <ul>
                <li><span className="date">26 septembre :</span> rentrée des internes</li>
                <li><span className="date">30 septembre :</span> réunion de tous les étudiants + Messe du Saint-Esprit</li>
                <li><span className="date">27 octobre :</span> fête patronale et Ordre mineur</li>
                <li><span className="date">1er novembre :</span> la Toussaint (pas de cours)</li>
                <li><span className="date">20 décembre :</span> vacances de Noël</li>
                <li><span className="date">3 janvier :</span> rentrée des internes</li>
                <li><span className="date">4 janvier :</span> reprise des cours</li>
                <li><span className="date">27 janvier au 5 février :</span> examens semestriels</li>
                <li><span className="date">7 au 8 février :</span> symposium</li>
              </ul>
            </div>

            <div className="content-section">
              <h3>DEUXIÈME SEMESTRE : 10 février - 20 juin 2025</h3>
              <ul>
                <li><span className="date">10 février :</span> début des cours</li>
                <li><span className="date">9 avril :</span> vacances de Pâques</li>
                <li><span className="date">24 avril :</span> rentrée des internes</li>
                <li><span className="date">25 avril :</span> reprise des cours</li>
                <li><span className="date">29 mai :</span> Ascension</li>
                <li><span className="date">6-18 juin :</span> examens semestriels</li>
                <li><span className="date">9 juin :</span> lundi de Pentecôte</li>
                <li><span className="date">19 juin :</span> réunion des Enseignants</li>
                <li><span className="date">20 juin :</span> clôture de l’année académique par la Sainte Messe</li>
                <li><span className="date">25 septembre :</span> rentrée 2025-2026</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .floating-button {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          z-index: 3000;
          border-radius: 4px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .floating-button:hover {
          transform: scale(1.1);
        }

        /* Overlay */
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0);
          pointer-events: none;
          transition: background 0.3s ease;
          z-index: 2999;
          display: flex;
          justify-content: flex-end;
        }
        .overlay.active {
          background: rgba(0, 0, 0, 0.4);
          pointer-events: all;
        }

        /* Modal */
        .event-modal {
          background: #fff;
          width: 550px;
          height: 100%;
          box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
          padding: 0;
          overflow-y: auto;
          z-index: 3000;
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }
        .overlay.active .event-modal {
          transform: translateX(0);
        }

        /* Header */
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f7f7f7;
          border-bottom: 2px solid #ccc;
          padding: 15px;
          font-family: Arial, sans-serif;
          color: #333;
        }
        .modal-header h2 {
          font-size: 18px;
          margin: 0;
        }
        .close-btn {
          cursor: pointer;
          font-size: 22px;
          color: rgb(63, 61, 60);
          transition: transform 0.2s ease;
        }
        .close-btn:hover {
          transform: scale(1.2);
        }

        /* Contenu */
        .modal-content {
          padding: 15px;
          font-family: Arial, sans-serif;
          color: #333;
        }
        .content-section {
          background: #f7f7f7;
          margin-bottom: 15px;
          padding: 10px;
          border-bottom: 2px solid #ccc;
        }
        .content-section h3 {
          margin: 0;
          font-size: 16px;
          font-weight: bold;
          color: #333;
        }
        .content-section ul {
          list-style: none;
          padding: 0;
          margin-top: 10px;
        }
        .content-section ul li {
          padding: 5px 0;
          border-bottom: 1px solid #ddd;
        }
        .content-section ul li:last-child {
          border-bottom: none;
        }

        .date {
          font-weight: 500; /* ou 'bold' selon votre préférence */
        }


        /* Responsive */
        @media (max-width: 768px) {
          .event-modal {
            width: 100%;
          }
          .modal-header {
            padding: 12px;
          }
          .modal-header h2 {
            font-size: 16px;
          }
          .modal-content {
            padding: 12px;
          }
          .content-section {
            padding: 8px;
          }
        }
      `}</style>
    </>
  );
};

export default FloatingCalendar;
