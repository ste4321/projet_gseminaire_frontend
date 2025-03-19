import Retour from '../components/Retour';
import React, { useEffect } from 'react';

const ReadMore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Retour />

      <div className="readmore-container">
        <header className="readmore-header">
          <h1>Présentation Générale</h1>
          <p className="sub">Les éducateurs du Grand Séminaire de Théologie à Faliarivo</p>
        </header>

        <section className="readmore-intro">
          <img
            src="images/cc.jpg"
            className="readmore-img"
            alt="Grand Séminaire Faliarivo"
          />
          <div className="readmore-text">
            <h4>Grand Séminaire Faliarivo</h4>
            <p>
              Ancré dans l’histoire depuis 1929, le séminaire a formé de nombreux candidats au sacerdoce. 
            </p>
            {/* <p>
              Ce texte continue à côté de l'image et se prolonge en dessous lorsque l'espace latéral n'est plus suffisant pour contenir tout le contenu.
            </p> */}
          </div>
        </section>

        <section className="readmore-content">
          <p>
            Malgré le souvenir attendri du bon vieux temps où tous les candidats au sacerdoce, 
            du Cap d’Ambre au Cap Sainte Marie, effectuaient leurs études canoniques au Grand Séminaire 
            Saint Pierre, d’Ambatoroka, tout de granit, ou presque – et ceci depuis le 21 novembre 1929 – 
            inauguration le 3 avril 1930 – étant donné que toute vie réussie dure, croît et déborde, la 
            Conférence Épiscopale de Madagascar estima le moment venu de procéder à la décentralisation. 
            Pour l’Archidiocèse du Centre, les cours de Philosophie émigrèrent à Antsirabe en 1986. Les cours 
            de Théologie s’accommodèrent des locaux du Lycée Agricole d’Ambatobe…Atterrissage en catastrophe ? 
            Voici le rappel de quelques-unes des moult péripéties qui ont abouti à ce dépaysement.
          </p>
          <p>
          Grâce à l’effort conjugué du Vicaire Apostolique Mgr Victor Sartre, du RP François Rastoul  Recteur 
          du Petit Séminaire d’Ambohipo, avec le fort appui de Rome, l’aide puissante d’individualités généreuses
           de France notamment, avec la participation de la population catholique tananarivienne et des environs, 
           grâce à l’endurance des séminaristes – car les jeudis de l’année scolaire 1952-1953 étaient particulièrement 
           éprouvants – un bâtiment sortit de terre, imposant de proportions et de style, le tout dû à l’architecte 
           qui a, en quelque sorte préfabriqué son domicile à pied d’œuvre afin de pouvoir surveiller aussi souvent,
            aussi longtemps qu’il jugera utile.  C’est Monsieur René Bablon : son nom peut rimer avec bénédiction.          </p>
          <p>
          L’emplacement jadis s’appelait Alarobiakely (petit mercredi) : un marché s’y tenait où également on exécutait
           aussi les condamnés ; les déblaiements mirent à jour des ossements humains avec une calotte osseuse accusant 
           d’emblée l’usage de la scie. De là à augurer les malheurs que l’au-delà courroucé ne manquerait pas d’infliger, 
           il n’y a pas loin : « Cette grande maison des catholiques, dit-on, croulera : les ancêtres sont mécontents ». 
           Toujours est-il qu’un beau jour, le Vendredi Saint 3 avril 1953, l’essaim quitta l’ancienne ruche d’Ambohipo et 
           s’abattit sur Faliarivo (les Milles -en –joie), appellation empruntée à un quartier périphérique d’à côté. 
           La pièce la plus vaste du rez-de chaussée on l’appela chapelle. Vous imaginez le reste.
          </p>
          <p>
          Mais à un moment ou à un autre, le moral peut connaître un fléchissement ; ce n’est pas toujours gratuit ; 
          les remous politiques qui virent la IIe République remplacer la 1ère y sont pour quelque chose. Monseigneur
           Jérôme Cardinal Rakotomalala ferma le séminaire en date du mardi 23 mai 1972. Le Lycée français bousculé 
           par la croissance lui aussi, s’y engouffra après des transactions laborieuses.
          </p>
          <p>
          L’enfantement au moment convenu fut difficile, impossible même, ou plutôt très malaisé car le mot 
          impossible a mauvaise presse. Finalement ce fut le Lycée Agricole qui sauva l’année scolaire 1997-1998. Le 
          13 octobre 1998, Mgr Armand Gaétan Cardinal Razafindratandra inaugura le Grand Séminaire Théologique de 
          Faliarivo (GSTF).
          </p>
        </section>
      </div>
    </>
  );
};

export default ReadMore;
