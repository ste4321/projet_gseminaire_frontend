import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

const FloatingButton = styled.div`
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

  &:hover {
    transform: scale(1.1);
  }
`;

const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active"
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ active }) =>
    active ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0)"};
  pointer-events: ${({ active }) => (active ? "all" : "none")};
  transition: background 0.3s ease;
  z-index: 2999;
  display: flex;
  justify-content: flex-end;
`;

const EventModal = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active"
})`
  background: #fff;
  width: 550px;
  height: 100%;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 0;
  overflow-y: auto;
  z-index: 3000;
  transform: ${({ active }) =>
    active ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
  }
`;


const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;
  border-bottom: 2px solid #ccc;
  padding: 15px;
  font-family: Arial, sans-serif;
  color: #333;

  h2 {
    font-size: 18px;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const CloseBtn = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 22px;
  color: rgb(63, 61, 60);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const ModalContent = styled.div`
  padding: 15px;
  font-family: Arial, sans-serif;
  color: #333;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const ContentSection = styled.div`
  background: #f7f7f7;
  margin-bottom: 15px;
  padding: 10px;
  border-bottom: 2px solid #ccc;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 10px;

    li {
      padding: 5px 0;
      border-bottom: 1px solid #ddd;

      &:last-child {
        border-bottom: none;
      }

      .date {
        font-weight: 500;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const FloatingCalendar = () => {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <>
      {/* Bouton flottant */}
      {!showEvents && (
        <FloatingButton translate="no" onClick={() => setShowEvents(true)}>
          <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
        </FloatingButton>
      )}

      <Overlay active={showEvents} onClick={() => setShowEvents(false)}>
        <EventModal active={showEvents} onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <h2>CALENDRIER ACADEMIQUE 2025-2026</h2>
            <CloseBtn
              icon={faTimes}
              className="close-btn"
              onClick={() => setShowEvents(false)}
            />
          </ModalHeader>
          <ModalContent>
            <ContentSection>
              <h3>PREMIER SEMESTRE : 25 septembre 2025 au 07 février 2026</h3>
              <ul>
                <li>
                  <span className="date">Jeudi 26 septembre :</span> rentrée des internes
                </li>
                <li>
                  <span className="date">Lundi 29 septembre :</span> réunion de tous les étudiants à 08h + Messe du Saint-Esprit à 10h
                </li>
                <li>
                  <span className="date">Dimanche 26 octobre :</span> fête patronale et Ordre mineur
                </li>
                <li>
                  <span className="date">Samedi 01 novembre :</span> la Toussaint (pas de cours)
                </li>
                <li>
                  <span className="date">Mercredi 17 décembre :</span> vacances de Noël (après-midi)
                </li>
                <li>
                  <span className="date">Samedi 03 janvier :</span> rentrée des internes
                </li>
                <li>
                  <span className="date">Lundi 05 janvier :</span> reprise des cours
                </li>
                <li>
                  <span className="date">Du 22 janvier au 04 février :</span> examens semestriels
                </li>
                <li>
                  <span className="date">Vendredi 06 et samedi 07 février :</span> symposium
                </li>
              </ul>
            </ContentSection>

            <ContentSection>
              <h3>DEUXIEME SEMESTRE : du 09 février au 19 juin 2026</h3>
              <ul>
                <li>
                  <span className="date">Lundi 09 février :</span> début des cours
                </li>
                <li>
                  <span className="date">Jeudi 26 mars :</span> vacances de Pâques
                </li>
                <li>
                  <span className="date">Jeudi 09 avril :</span> rentrée des internes
                </li>
                <li>
                  <span className="date">Vendredi 10 avril :</span> reprise des cours
                </li>
                <li>
                  <span className="date">Jeudi 14 mai :</span> Ascension (excursion)
                </li>
                <li>
                  <span className="date">Dimanche 17 mai :</span> sakafom-pitiavana
                </li>
                <li>
                  <span className="date">Lundi 24 mai :</span> lundi de Pentecôte
                </li>
                <li>
                  <span className="date">Du 05 juin au 17 juin :</span>examens semestriels
                </li>
                <li>
                  <span className="date">Mercredi 17 juin :</span> grand oral
                </li>
                <li>
                  <span className="date">Jeudi 11 juin :</span> réunion des Educateurs avec les Responsables des Foyers 
                </li>
                <li>
                  <span className="date">Jeudi 18 juin :</span> réunion des Enseignants
                </li>
                <li>
                  <span className="date">Vendredi 19 juin :</span> clôture de l’année académique par la Sainte Messe
                </li>
                <li>
                  <span className="date">Jeudi 24 septembre :</span> rentrée 2026-2027
                </li>
              </ul>
            </ContentSection>
          </ModalContent>
        </EventModal>
      </Overlay>
    </>
  );
};

export default FloatingCalendar;
