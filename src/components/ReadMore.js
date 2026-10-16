import React, { useState } from 'react';
import SidePanel from './SidePanel';

// Texte complet de la « Présentation générale » (section À propos)
const paragraphs = [
  "Malgré le souvenir attendri du bon vieux temps où tous les candidats au sacerdoce, du Cap d’Ambre au Cap Sainte Marie, effectuaient leurs études canoniques au Grand Séminaire Saint Pierre, d’Ambatoroka, tout de granit, ou presque – et ceci depuis le 21 novembre 1929 – inauguration le 3 avril 1930 – étant donné que toute vie réussie dure, croît et déborde, la Conférence Épiscopale de Madagascar estima le moment venu de procéder à la décentralisation. Pour l’Archidiocèse du Centre, les cours de Philosophie émigrèrent à Antsirabe en 1986. Les cours de Théologie s’accommodèrent des locaux du Lycée Agricole d’Ambatobe…Atterrissage en catastrophe ? Voici le rappel de quelques-unes des moult péripéties qui ont abouti à ce dépaysement.",
  "Grâce à l’effort conjugué du Vicaire Apostolique Mgr Victor Sartre, du RP François Rastoul Recteur du Petit Séminaire d’Ambohipo, avec le fort appui de Rome, l’aide puissante d’individualités généreuses de France notamment, avec la participation de la population catholique tananarivienne et des environs, grâce à l’endurance des séminaristes – car les jeudis de l’année scolaire 1952-1953 étaient particulièrement éprouvants – un bâtiment sortit de terre, imposant de proportions et de style, le tout dû à l’architecte qui a, en quelque sorte préfabriqué son domicile à pied d’œuvre afin de pouvoir surveiller aussi souvent, aussi longtemps qu’il jugera utile. C’est Monsieur René Bablon : son nom peut rimer avec bénédiction.",
  "L’emplacement jadis s’appelait Alarobiakely (petit mercredi) : un marché s’y tenait où également on exécutait aussi les condamnés ; les déblaiements mirent à jour des ossements humains avec une calotte osseuse accusant d’emblée l’usage de la scie. De là à augurer les malheurs que l’au-delà courroucé ne manquerait pas d’infliger, il n’y a pas loin : « Cette grande maison des catholiques, dit-on, croulera : les ancêtres sont mécontents ». Toujours est-il qu’un beau jour, le Vendredi Saint 3 avril 1953, l’essaim quitta l’ancienne ruche d’Ambohipo et s’abattit sur Faliarivo (les Milles -en –joie), appellation empruntée à un quartier périphérique d’à côté. La pièce la plus vaste du rez-de chaussée on l’appela chapelle. Vous imaginez le reste.",
  "Mais à un moment ou à un autre, le moral peut connaître un fléchissement ; ce n’est pas toujours gratuit ; les remous politiques qui virent la IIe République remplacer la 1ère y sont pour quelque chose. Monseigneur Jérôme Cardinal Rakotomalala ferma le séminaire en date du mardi 23 mai 1972. Le Lycée français bousculé par la croissance lui aussi, s’y engouffra après des transactions laborieuses.",
  "L’enfantement au moment convenu fut difficile, impossible même, ou plutôt très malaisé car le mot impossible a mauvaise presse. Finalement ce fut le Lycée Agricole qui sauva l’année scolaire 1997-1998. Le 13 octobre 1998, Mgr Armand Gaétan Cardinal Razafindratandra inaugura le Grand Séminaire Théologique de Faliarivo (GSTF).",
];

// Repères chronologiques, résumés à partir du texte ci-dessus
const milestones = [
  { date: '21 novembre 1929', text: 'Début des études au Grand Séminaire Saint Pierre d’Ambatoroka, inauguré le 3 avril 1930.' },
  { date: '1952 – 1953', text: 'Construction du bâtiment de Faliarivo, œuvre de l’architecte René Bablon.' },
  { date: '3 avril 1953', text: 'Le Vendredi Saint, la communauté quitte Ambohipo et s’installe à Faliarivo.' },
  { date: '23 mai 1972', text: 'Le Cardinal Jérôme Rakotomalala ferme le séminaire ; le Lycée français s’installe dans les locaux.' },
  { date: '1986', text: 'Décentralisation : les cours de Philosophie de l’Archidiocèse du Centre partent à Antsirabe.' },
  { date: '1997 – 1998', text: 'Les cours de Théologie sont accueillis au Lycée Agricole d’Ambatobe.' },
  { date: '13 octobre 1998', text: 'Le Cardinal Armand Gaétan Razafindratandra inaugure le Grand Séminaire de Théologie de Faliarivo.' },
];

const ReadMore = ({ isOpen, onRequestClose }) => {
  const [showFullStory, setShowFullStory] = useState(false);

  return (
    <SidePanel
      isOpen={isOpen}
      onClose={onRequestClose}
      eyebrow="À propos"
      title="Présentation générale"
    >
      <figure className="panel-figure">
        <img src="images/cc.webp" alt="Le Grand Séminaire de Théologie Faliarivo" loading="lazy" />
        <figcaption>
          Ancré dans l’histoire depuis 1929, le séminaire a formé de nombreux candidats au sacerdoce.
        </figcaption>
      </figure>
      <h3 className="panel-heading">Repères</h3>
      <ol className="milestones">
        {milestones.map((item) => (
          <li key={item.date}>
            <span className="milestones__date">{item.date}</span>
            <span className="milestones__text">{item.text}</span>
          </li>
        ))}
      </ol>

      <h3 className="panel-heading">L’histoire complète</h3>
      {(showFullStory ? paragraphs : paragraphs.slice(0, 1)).map((text, i) => (
        <p key={i}>{text}</p>
      ))}
      <button
        type="button"
        className="read-toggle"
        aria-expanded={showFullStory}
        onClick={() => setShowFullStory((prev) => !prev)}
      >
        {showFullStory ? 'Réduire ↑' : 'Lire toute l’histoire →'}
      </button>
    </SidePanel>
  );
};

export default ReadMore;
