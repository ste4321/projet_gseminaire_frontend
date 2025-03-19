import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

// Pour l’accessibilité, on définit l’élément racine de l’application
Modal.setAppElement('#root');

const DetailModal = ({ isOpen, onRequestClose, title, content }) => {
  // Style initial du contenu du modal (opacité 0 et translation pour l'animation)
  const [contentStyle, setContentStyle] = useState({
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -35%) scale(0.95)', // Décalage vertical réduit pour le positionner plus bas
    maxWidth: '600px',
    width: '90%',
    maxHeight: '65vh',        // Limite la hauteur du modal à 80% de la hauteur de la vue
    overflowY: 'auto',        // Active le scroll vertical lorsque le contenu dépasse
    transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
    opacity: 0,
  });

  useEffect(() => {
    // Sélection de l'élément "gototop js-top" s'il existe
    const gototopElement = document.querySelector('.gototop.js-top');
    const floatingButton = document.querySelector('.floating-button');


    if (isOpen) {
      // Désactiver le scroll du body
      document.body.style.overflow = 'hidden';
      // Masquer le bouton "gototop js-top"
      if (gototopElement) {
        gototopElement.style.display = 'none';
      }
      if (floatingButton) {
        floatingButton.style.display = 'none';
      }
      // Lancer la transition pour faire apparaître le modal
      setTimeout(() => {
        setContentStyle(prev => ({
          ...prev,
          opacity: 1,
          transform: 'translate(-50%, -50%) scale(1)',
        }));
      }, 10);
    } else {
      // Réactiver le scroll lorsque le modal se ferme
      document.body.style.overflow = '';
      // Réafficher le bouton "gototop js-top"
      if (gototopElement) {
        gototopElement.style.display = '';
      }
      if (floatingButton) {
        floatingButton.style.display = '';
      }
      // Appliquer la transition de fermeture
      setContentStyle(prev => ({
        ...prev,
        opacity: 0,
        transform: 'translate(-50%, -45%) scale(0.95)',
      }));
    }
  }, [isOpen]);

  // Style de l'overlay avec transition pour une apparition/disparition douce
  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transition: 'opacity 300ms ease-in-out',
    opacity: isOpen ? 1 : 0,
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Détail"
      closeTimeoutMS={300} // Temps de transition avant démontage
      style={{
        overlay: overlayStyle,
        content: contentStyle,
      }}
    >
      <h2>{title}</h2>
      <div>{content}</div>
      <button onClick={onRequestClose} className="retour-btn">Fermer</button>
    </Modal>
  );
};

export default DetailModal;
