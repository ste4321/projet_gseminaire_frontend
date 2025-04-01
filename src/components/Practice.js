import React, { useState } from 'react';
import DetailModal from './DetailModal';
import { FaUsers, FaBrain, FaChurch } from 'react-icons/fa';
import { GiAngelWings } from 'react-icons/gi';

// Composant principal Practice
const Practice = () => {
  // États pour gérer l'ouverture du modal et son contenu
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentDetail, setCurrentDetail] = useState({ title: '', content: '' });

  // Fonction pour ouvrir le modal avec le détail choisi
  const openModal = (detail) => {
    setCurrentDetail(detail);
    setModalIsOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Données associées à chaque "détail"
  const details = {
    detail1: {
      title: 'La dimension humaine de la formation en vue du Sacerdoce',
      content: (
        <>
          <p>
            « la formation humaine du prêtre revêt une importance particulière en raison de sa relation aux destinataires de sa mission. En effet, pour que son ministère soit humainement plus crédible et plus acceptable, il faut que le prêtre modèle sa personnalité humaine de façon à en faire un "pont" et non un obstacle pour les autres dans la rencontre avec Jésus Christ Rédempteur de l'homme » (Pastores Dabo Vobis 43).
          </p>
          <p>
            « Les séminaristes doivent être bien convaincus qu’ils ne sont pas destinés à la domination et aux honneurs, mais tout entiers voués au service de Dieu et au ministère pastoral. Qu’on apporte un soin particulier à développer en eux l’obéissance sacerdotale, la vie de pauvreté et l’esprit d’abnégation » (Optatam totius 9).
            Conformément à cet appel du Concile et en tenant compte de la grande diversité des séminaristes formés ici au Grand Séminaire, on essaie de donner une place privilégiée à la vie communautaire et au respect que cela exige. Chaque année, le thème proposé tourne autour de l’importance de cette vie commune.
          </p>
          <p>
            Pour ce faire, des activités sont organisées ; elles peuvent être journalières ou hebdomadaires. Tous les séminaristes sont conviés à y participer et les répartitions se font généralement par groupe d’activités (au nombre de cinq). Chaque groupe d’activité est dirigé par un « chef » qui anime les membres à la réalisation de la tâche qui incombe.
            Au Séminaire, les organisations sportives servent aussi à tisser ce lien communautaire. Il y a à notre disposition des terrains de foot, de basket et de volley-ball. Ceux qui ne peuvent pas pratiquer aux jeux collectifs pour une raison particulière peuvent aussi pratiquer à d’autres jeux (ping-pong, pétanque…). Les jeux se font généralement après le repas de midi jusqu’à 14 heures trente. Des matches entre les séminaristes sont organisés chaque trimestre (par promotion ou par groupe ou par bâtiment).
 
          </p>
        </>
      ),
    },
    detail2: {
      title: 'La dimension spirituelle de la formation en vue du Sacerdoce',
      content: (
        <>
          <p>
            La vie spirituelle concerne « la vie selon l’Esprit Saint » (Rm 8,9), « une vie animée et guidée par l’Esprit Saint vers la sainteté et la perfection de la charité » (Pastores Dabo Vobis N°19). Appliquée à la vie du prêtre, une spiritualité ainsi conçue met au premier plan l’Esprit Saint qui le pousse et le conduit à la consécration et à la mission sacerdotale du Christ. Ce qui fait qu’à l’exercice du ministère ordonné correspond une vie spirituelle qui s’inspire du sacrement de l’ordre lui-même.
          </p>
          <p>
            La formation spirituelle est la première des exigences qui incombent à un futur prêtre. Ce n’est pas l’ordination seule qui configure le prêtre au Christ, mais c’est l’ensemble du cheminement que le prêtre entreprend au fil des jours, cheminement qui commence dès le séminaire et, qui vise à vivre en communion d’amour avec le Père, dans l’Esprit Saint, par le Christ son Fils, le Mystère de sa Pâque.
          </p>
          
          <p>
            « La formation spirituelle doit avoir un lien étroit avec la formation doctrinale et pastorale et, avec l’aide principalement du directeur spirituel, elle doit être donnée de telle façon que les séminaristes apprennent à vivre continuellement dans la familiarité du Père, par son Fils Jésus-Christ, dans l’Esprit-Saint » (Optatam Totius N°8). 
            Pour parvenir à cette union avec la très Sainte Trinité, au Séminaire, on donne de l’importance à la centralité de la célébration eucharistique journalière : elle est communautaire chaque lundi, mardi et vendredi ; par groupe chaque mercredi et jeudi et par promotion chaque samedi. Chaque dimanche, les séminaristes vont en paroisse pour le ministère pastoral.
          </p>
          <p>
            Chaque jour, on consacre trente minutes de méditation et autres trente minutes pour la lectio divina. L’exercice de l’Office divin se fait aussi suivant les répartitions de la célébration eucharistique mentionnées ci-dessus. On incite les séminaristes à la visite du Saint Sacrément qu’ils pratiquent spontanément après chaque repas. Les prières avec Marie s’organisent aussi quotidiennement par groupe spontané. 
            Tous les vendredis de 18 heures à 19 heures, un Prêtre éducateur et responsable de la promotion donne une conférence spirituelle à chaque promotion. Tandis que tous les premiers jeudis du mois, tous les séminaristes (par groupe ou par promotion ou communautaire) ont une journée de récollection prêchée généralement par un Prêtre invité. La veille de cette journée, une heure d’adoration eucharistique a lieu durant laquelle quelques points de méditation sont donnés par l’éducateur responsable de la semaine.
          </p>
        <p>
          Chaque année, les respectifs diocèses s’organisent pour donner une semaine de retraite à leurs séminaristes. Cette retraite se fait d’habitude dans leur propre diocèse avant le début de chaque année académique. Généralement, les séminaristes rapportent à titre d’information, aux éducateurs le thème prêché lors de chaque retraite.
          Arrivé au Séminaire, chaque séminariste doit choisir un directeur spirituel, soit parmi les éducateurs à part le recteur, soit parmi les curés des paroisses aux alentours, soit parmi les enseignants. Il est convié à chaque séminariste d’aller s’entretenir avec lui tous les mois. Cette fréquence est exigée et le Séminaire, vers la fin de l’année académique demande à chaque directeur spirituel le nombre de rencontres.
        </p>
        </>
      ),
    },
    detail3: {
      title: 'La dimension intellectuelle de la formation en vue du Sacerdoce : Cycle théologique',
      content: (
        <>
          <p>
            Il est dit dans le rite d’ordination sacerdotale : « Tu veux, Seigneur, que ton peuple tout entier participe au sacerdoce de ton Fils ; et Tu confies à certains de ses membres la charge de le sanctifier, de le conduire et de l’enseigner au nom du Christ. Accorde à N., dont Tu vas faire son prêtre, la grâce d’être fidèle à sa mission. Que par son ministère et toute sa vie, il aide les hommes et serve ta Gloire. Amen ». 
            Cette charge d’« enseigner au nom du Christ » ne va pas de soi, elle exige l’acquisition nécessaire de la connaissance des « études ecclésiastiques » et d’autres connaissances sur l’homme et sur le monde.
          </p>  
            <p>
              L’acquisition de ces connaissances se fait au Séminaire où le temps consacré aux études est le plus volumineux dans ces maisons de formation. Ce qui fait comprendre l’importance de la dimension intellectuelle pour la formation sacerdotale. La mise en garde du Pape François concernant l’importance de la dimension intellectuelle est pertinente : « le monde ne tolère pas la piètre figure d’un prêtre qui ne comprend pas les choses, qui n’a pas de méthode pour comprendre les choses et qui ne sait pas dire les choses de Dieu de manière fondée » (Pape François, décembre 2016).
              Conformément aux normes exigées par le décret conciliaire Optatam Totius N°16, les études se répartissent en trois grandes parties : premièrement, une grande place à l’Écriture Sainte, toute la Bible est étudiée pendant les trois années de présence ici au Séminaire. Les études de l’Écriture Sainte sont assurées par cinq professeurs de la Bible. 
              Deuxièmement, la Théologie dogmatique qui est assurée par neuf professeurs. Les matières en Théologie dogmatique sont : la Christologie, la Pneumatologie, les Sacrements, l’Ecclésiologie, la Théologie trinitaire, la Théologie spirituelle, la Mariologie et la Dogmatique spéciale (Théologie la Sainte Trinité, Théologie de la Création, Théologie du Péché originel et Théologie de la Grâce).
          </p>
          <p>
            Enfin, les autres disciplines théologiques qui sont assurées par quinze professeurs. Il s’agit des études de : Code de Droit canonique, Œcuménisme, Latin, Morale fondamentale, Morale sociale, Bioéthique, Liturgie, Musique sacrée, Missiologie, Histoire de l’Église, Histoire de l’Église à Madagascar, Histoire des Conciles, Anthropologie, Théologie des religions et Pastorale pratique.
            À chaque fin de semestre, les séminaristes passent aux examens les matières étudiées tandis que trois Travaux Pratiques de dix à quinze pages chacun doivent être faits chaque année académique. Le Séminaire organise chaque année un symposium dont le thème est varié suivant les circonstances et est présenté par quatre professeurs du Séminaire. Ce symposium sert surtout de séparer les deux semestres de l’année académique.
          </p>
        </>
      ),
    },
    detail4: {
      title: 'La dimension pastorale de la formation en vue du Sacerdoce',
      content: (
        <>
          <p>
            Toute la formation sacerdotale est en vue de la pastorale. L’exhortation post-synodale du Pape Jean-Paul II est explicite sur ce point : « toute la formation des candidats au sacerdoce est destinée à les disposer d'une façon plus particulière à communier à la charité du Christ Bon Pasteur. Cette formation doit donc, dans ses divers aspects, avoir un caractère essentiellement pastoral » (Pastores Dabo Vobis N°57).
          </p>
          <p>
            « Le souci pastoral qui doit informer toute la formation des séminaristes exige aussi qu’ils reçoivent une préparation en ce qui concerne spécialement le ministère… Aussi, déjà pendant leurs études, ainsi que pendant les vacances, doivent-ils s’initier à la pratique de l’apostolat par des activités bien choisies » (Optatam Totius N°19.21).
            En général, le ministère exercé par les séminaristes au GSTF se divise en trois : ministère auprès des écoles catholiques (enseignement de la catéchèse), ministère dans les paroisses et ministère auprès des aumôneries catholiques. Les séminaristes en première année sont répartis dans des écoles catholiques de la ville où ils vont tous les jeudis tandis que ceux de la deuxième et de la troisième année sont envoyés dans des paroisses et dans des aumôneries.
          </p>
          <p>
            Chaque séminariste est présenté par le Séminaire au responsable de chaque poste par une lettre d’envoi au début de l’année académique tout en indiquant l’importance du ministère pour la formation en vue du sacerdoce. Il est convié aux séminaristes de bien s’entretenir avec ces responsables de ces postes à qui le Séminaire demande un rapport des activités pastorales vers la fin de l’année académique. 
            Comme chaque année, à la fête de Sainte Thérèse de l’Enfant-Jésus, la patronne du Séminaire, les séminaristes en quatrième année de Théologie s’engagent au service de lectorat et d’acolytat. Ils exercent ce service ici au Séminaire et là où ils sont envoyés en ministère. Les Prêtres responsables des paroisses sont avisés par le recteur du Séminaire de cette institution.
          </p>
        </>
      ),
    },
  };

  return (
    <>
      <section id="gtco-practice-areas" data-section="practice-areas">
        <div className="container">
          <div className="row row-pb-md">
            <div
              className="col-md-8 col-md-offset-2 heading animate-box"
              data-animate-effect="fadeIn"
            >
              <h1>Formation au grand séminaire</h1>
              <p className="sub">
                Les quatre dimensions de la formation au Grand Séminaire, considérée comme « la base nécessaire et dynamique de toute la vie presbytérale » (Ratio Fundamentalis Institutionis Sacerdotalis 89)
              </p>
              {/* <p className="subtle-text animate-box" data-animate-effect="fadeIn">
                Practice <span>Areas</span>
              </p> */}
            </div>
          </div>
          <div className="row">
            {/* Colonne de gauche */}
            <div className="col-md-6">
              <div className="gtco-practice-area-item animate-box">
                <div className="gtco-icon">
                  <FaUsers size={50} color="#855d08" />
                </div>
                <div className="gtco-copy">
                  <h3>La dimension humaine de la formation en vue du Sacerdoce</h3>
                  <p>
                  la formation humaine du prêtre revêt une importance particulière en raison de sa relation aux destinataires de sa mission. En effet, pour que son ministère soit humainement plus crédible et plus acceptable, il faut que le prêtre modèle sa personnalité humaine de façon à en faire un "pont" et non un obstacle pour les autres {' '}
                    <a href="#!" translate="no" onClick={() => openModal(details.detail1)}>
                      voir plus...
                    </a>
                  </p>
                </div>
              </div>

              <div className="gtco-practice-area-item animate-box">
                <div className="gtco-icon">
                  <GiAngelWings size={50} color="#855d08" />
                </div>
                <div className="gtco-copy">
                  <h3>La dimension spirituelle de la formation en vue du Sacerdoce</h3>
                  <p>
                  La vie spirituelle concerne « la vie selon l’Esprit Saint » (Rm 8,9), « une vie animée et guidée par l’Esprit Saint vers la sainteté et la perfection de la charité » (Pastores Dabo Vobis N°19). Appliquée à la vie du prêtre, une spiritualité ainsi conçue met au premier plan l’Esprit Saint qui le pousse et le conduit à la consécration et à la mission sacerdotale du Christ.{' '}
                    <a href="#!" translate="no" onClick={() => openModal(details.detail2)}>
                      voir plus...
                    </a>
                  </p>
                </div>
              </div>
            </div>
            {/* Colonne de droite */}
            <div className="col-md-6">
              <div className="gtco-practice-area-item animate-box">
                <div className="gtco-icon">
                  <FaBrain size={50} color="#855d08" />
                </div>
                <div className="gtco-copy">
                  <h3>
                    La dimension intellectuelle de la formation en vue du Sacerdoce : Cycle théologique
                  </h3>
                  <p>
                  Il est dit dans le rite d’ordination sacerdotale : « Tu veux, Seigneur, que ton peuple tout entier participe au sacerdoce de ton Fils ; et Tu confies à certains de ses membres la charge de le sanctifier, de le conduire et de l’enseigner au nom du Christ. Accorde à N., dont Tu vas faire son prêtre, la grâce d’être fidèle à sa mission.{' '}
                    <a href="#!" translate="no" onClick={() => openModal(details.detail3)}>
                      voir plus...
                    </a>
                  </p>
                </div>
              </div>

              <div className="gtco-practice-area-item animate-box">
                <div className="gtco-icon">
                  <FaChurch size={50} color="#855d08" />
                </div>
                <div className="gtco-copy">
                  <h3>La dimension pastorale de la formation en vue du Sacerdoce</h3>
                  <p>
                  Toute la formation sacerdotale est en vue de la pastorale. L’exhortation post-synodale du Pape Jean-Paul II est explicite sur ce point : « toute la formation des candidats au sacerdoce est destinée à les disposer d'une façon plus particulière à communier à la charité du Christ Bon Pasteur. Cette formation doit donc, dans ses divers aspects,{' '}
                    <a href="#!" translate="no" onClick={() => openModal(details.detail4)}>
                      voir plus...
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Le modal de détail */}
      <DetailModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        title={currentDetail.title}
        content={currentDetail.content}
      />
    </>
  );
};

export default Practice;