import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setCookie, getCookie } from '../utils/cookie';
import '../styles/Info.css';

const Info = () => {
  const [infos, setInfos] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewedInfos, setViewedInfos] = useState(new Set());
  const [modalVisible, setModalVisible] = useState(false);

  // Récupération des infos
  useEffect(() => {
    const fetchInfos = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/infos');
        setInfos(response.data);
        setError(null);

        const cookieData = getCookie('viewedInfos');
        if (cookieData) {
          setViewedInfos(new Set(JSON.parse(cookieData)));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des infos :", error);
        setError("Impossible de charger les informations. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchInfos();
  }, []);

  // Synchroniser localStorage + cookies + événement
  useEffect(() => {
    const viewedArray = [...viewedInfos];
    localStorage.setItem('viewedInfos', JSON.stringify(viewedArray));
    setCookie('viewedInfos', JSON.stringify(viewedArray));

    const event = new CustomEvent('updateInfoBadge', {
      detail: {
        totalInfos: infos.length,
        viewedInfos: viewedInfos.size,
      },
    });
    window.dispatchEvent(event);
  }, [viewedInfos, infos.length]);

  // Gérer l'affichage du modal
  useEffect(() => {
    const gototop = document.querySelector('.gototop.js-top');
    const floating = document.querySelector('.floating-button');

    if (selectedInfo) {
      document.body.style.overflow = 'hidden';
      gototop && (gototop.style.display = 'none');
      floating && (floating.style.display = 'none');
      setTimeout(() => setModalVisible(true), 10);
    } else {
      document.body.style.overflow = '';
      gototop && (gototop.style.display = '');
      floating && (floating.style.display = '');
      setModalVisible(false);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedInfo]);

  // Fermer modal avec ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedInfo(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
    });
  };

  const openModal = (info) => {
    setSelectedInfo(info);
    setViewedInfos(prev => new Set([...prev, info.id]));
  };

  const closeModal = () => {
    setSelectedInfo(null);
  };

  const getUnviewedCount = () => {
    return infos.filter(info => !viewedInfos.has(info.id)).length;
  };

  // Affichage
  if (loading) {
    return (
      <section id="gtco-info" data-section="info">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="loading-spinner">
                <p>Chargement des informations...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="gtco-info" data-section="info">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <div className="error-message">
                <p className="text-danger">{error}</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gtco-info" data-section="info">
      <div className="container">
        <div className="row row-pb-md">
          <div className="col-md-8 col-md-offset-2 heading animate-box" data-animate-effect="fadeIn">
            <h1>Information</h1>
            <p className="sub">
              Cette section contient toutes les informations publiées par les administrateurs du G.S.T.F.
            </p>
            {infos.length > 0 && (
              <p className="info-count">
                {infos.length} information{infos.length > 1 ? 's' : ''} disponible{infos.length > 1 ? 's' : ''}
                {getUnviewedCount() > 0 && (
                  <span className="unviewed-count"> - {getUnviewedCount()} non vue{getUnviewedCount() > 1 ? 's' : ''}</span>
                )}
              </p>
            )}
          </div>
        </div>

        {infos.length === 0 ? (
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
              <p className="no-info">Aucune information disponible pour le moment.</p>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12">
              <ul className="folio-list row block-lg-one-half block-stack-on-1000">
                {infos.map(info => (
                  <li
                    key={info.id}
                    className={`folio-list__item column ${viewedInfos.has(info.id) ? 'viewed' : 'unviewed'}`}
                    onClick={() => openModal(info)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(info);
                      }
                    }}
                    aria-label={`Voir les détails de ${info.titre}`}
                  >
                    <div className="folio-list__item-link">
                      <div className="folio-list__item-text">
                        <div className="folio-list__item-cat">
                          Auteur : {info.auteur}
                          {!viewedInfos.has(info.id) && (
                            <span className="new-badge">1</span>
                          )}
                        </div>
                        <div className="folio-list__item-title">
                          {info.titre}
                        </div>
                        <div className="folio-list__item-date">
                          Publié le : {formatDate(info.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="folio-list__proj-link" title="Voir plus">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M8.146 3.146a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L11.293 8H2.5a.5.5 0 0 1 0-1h8.793L8.146 3.854a.5.5 0 0 1 0-.708z" fill="currentColor" />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedInfo && (
        <div 
          className={`modal-overlay ${modalVisible ? 'modal-show' : ''}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className={`modal-content ${modalVisible ? 'modal-content-show' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 id="modal-title">{selectedInfo.titre}</h2>
              <button className="close-button" onClick={closeModal} aria-label="Fermer" type="button">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-date">
                <strong>Auteur :</strong> {selectedInfo.auteur}
              </p>
              <div className="modal-description">
                {selectedInfo.description.split('\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <p className="modal-admin">
                <strong>Date de publication :</strong> {formatDate(selectedInfo.created_at)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Info;
