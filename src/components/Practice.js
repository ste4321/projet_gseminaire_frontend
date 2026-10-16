import React, { useState } from 'react';
import SidePanel, { PanelBlocks } from './SidePanel';
import { FaUsers, FaBrain, FaChurch } from 'react-icons/fa';
import { GiAngelWings } from 'react-icons/gi';

// Les quatre dimensions de la formation, dans l'ordre de lecture du panneau
const dimensions = [
  {
    id: 'humaine',
    Icon: FaUsers,
    title: 'La dimension humaine',
    fullTitle: 'La dimension humaine de la formation en vue du Sacerdoce',
    excerpt: 'Le prêtre doit modeler sa personnalité humaine de façon à en faire un « pont » et non un obstacle pour les autres dans la rencontre avec Jésus Christ (Pastores Dabo Vobis 43).',
    blocks: [
      { type: 'quote', text: 'La formation humaine du prêtre revêt une importance particulière en raison de sa relation aux destinataires de sa mission. En effet, pour que son ministère soit humainement plus crédible et plus acceptable, il faut que le prêtre modèle sa personnalité humaine de façon à en faire un « pont » et non un obstacle pour les autres dans la rencontre avec Jésus Christ Rédempteur de l’homme.', source: 'Pastores Dabo Vobis 43' },
      { type: 'quote', text: 'Les séminaristes doivent être bien convaincus qu’ils ne sont pas destinés à la domination et aux honneurs, mais tout entiers voués au service de Dieu et au ministère pastoral. Qu’on apporte un soin particulier à développer en eux l’obéissance sacerdotale, la vie de pauvreté et l’esprit d’abnégation.', source: 'Optatam totius 9' },
      { type: 'p', text: 'Conformément à cet appel du Concile et en tenant compte de la grande diversité des séminaristes formés ici au Grand Séminaire, on essaie de donner une place privilégiée à la vie communautaire et au respect que cela exige. Chaque année, le thème proposé tourne autour de l’importance de cette vie commune.' },
      { type: 'p', text: 'Pour ce faire, des activités sont organisées ; elles peuvent être journalières ou hebdomadaires. Tous les séminaristes sont conviés à y participer et les répartitions se font généralement par groupe d’activités (au nombre de cinq). Chaque groupe d’activité est dirigé par un « chef » qui anime les membres à la réalisation de la tâche qui incombe.' },
      { type: 'p', text: 'Au Séminaire, les organisations sportives servent aussi à tisser ce lien communautaire. Il y a à notre disposition des terrains de foot, de basket et de volley-ball. Ceux qui ne peuvent pas pratiquer aux jeux collectifs pour une raison particulière peuvent aussi pratiquer à d’autres jeux (ping-pong, pétanque…). Les jeux se font généralement après le repas de midi jusqu’à 14 heures trente. Des matches entre les séminaristes sont organisés chaque trimestre (par promotion ou par groupe ou par bâtiment).' },
    ],
  },
  {
    id: 'spirituelle',
    Icon: GiAngelWings,
    title: 'La dimension spirituelle',
    fullTitle: 'La dimension spirituelle de la formation en vue du Sacerdoce',
    excerpt: 'La vie spirituelle concerne « la vie selon l’Esprit Saint » (Rm 8,9), « une vie animée et guidée par l’Esprit Saint vers la sainteté et la perfection de la charité » (Pastores Dabo Vobis N°19).',
    blocks: [
      { type: 'p', text: 'La vie spirituelle concerne « la vie selon l’Esprit Saint » (Rm 8,9), « une vie animée et guidée par l’Esprit Saint vers la sainteté et la perfection de la charité » (Pastores Dabo Vobis N°19). Appliquée à la vie du prêtre, une spiritualité ainsi conçue met au premier plan l’Esprit Saint qui le pousse et le conduit à la consécration et à la mission sacerdotale du Christ. Ce qui fait qu’à l’exercice du ministère ordonné correspond une vie spirituelle qui s’inspire du sacrement de l’ordre lui-même.' },
      { type: 'p', text: 'La formation spirituelle est la première des exigences qui incombent à un futur prêtre. Ce n’est pas l’ordination seule qui configure le prêtre au Christ, mais c’est l’ensemble du cheminement que le prêtre entreprend au fil des jours, cheminement qui commence dès le séminaire et, qui vise à vivre en communion d’amour avec le Père, dans l’Esprit Saint, par le Christ son Fils, le Mystère de sa Pâque.' },
      { type: 'quote', text: 'La formation spirituelle doit avoir un lien étroit avec la formation doctrinale et pastorale et, avec l’aide principalement du directeur spirituel, elle doit être donnée de telle façon que les séminaristes apprennent à vivre continuellement dans la familiarité du Père, par son Fils Jésus-Christ, dans l’Esprit-Saint.', source: 'Optatam Totius N°8' },
      { type: 'p', text: 'Pour parvenir à cette union avec la très Sainte Trinité, au Séminaire, on donne de l’importance à la centralité de la célébration eucharistique journalière : elle est communautaire chaque lundi, mardi et vendredi ; par groupe chaque mercredi et jeudi et par promotion chaque samedi. Chaque dimanche, les séminaristes vont en paroisse pour le ministère pastoral.' },
      { type: 'p', text: 'Chaque jour, on consacre trente minutes de méditation et autres trente minutes pour la lectio divina. L’exercice de l’Office divin se fait aussi suivant les répartitions de la célébration eucharistique mentionnées ci-dessus. On incite les séminaristes à la visite du Saint Sacrément qu’ils pratiquent spontanément après chaque repas. Les prières avec Marie s’organisent aussi quotidiennement par groupe spontané.' },
      { type: 'p', text: 'Tous les vendredis de 18 heures à 19 heures, un Prêtre éducateur et responsable de la promotion donne une conférence spirituelle à chaque promotion. Tandis que tous les premiers jeudis du mois, tous les séminaristes (par groupe ou par promotion ou communautaire) ont une journée de récollection prêchée généralement par un Prêtre invité. La veille de cette journée, une heure d’adoration eucharistique a lieu durant laquelle quelques points de méditation sont donnés par l’éducateur responsable de la semaine.' },
      { type: 'p', text: 'Chaque année, les respectifs diocèses s’organisent pour donner une semaine de retraite à leurs séminaristes. Cette retraite se fait d’habitude dans leur propre diocèse avant le début de chaque année académique. Généralement, les séminaristes rapportent à titre d’information, aux éducateurs le thème prêché lors de chaque retraite.' },
      { type: 'p', text: 'Arrivé au Séminaire, chaque séminariste doit choisir un directeur spirituel, soit parmi les éducateurs à part le recteur, soit parmi les curés des paroisses aux alentours, soit parmi les enseignants. Il est convié à chaque séminariste d’aller s’entretenir avec lui tous les mois. Cette fréquence est exigée et le Séminaire, vers la fin de l’année académique demande à chaque directeur spirituel le nombre de rencontres.' },
    ],
  },
  {
    id: 'intellectuelle',
    Icon: FaBrain,
    title: 'La dimension intellectuelle',
    fullTitle: 'La dimension intellectuelle de la formation en vue du Sacerdoce : Cycle théologique',
    excerpt: 'La charge d’« enseigner au nom du Christ » ne va pas de soi : elle exige la connaissance des « études ecclésiastiques » et d’autres connaissances sur l’homme et sur le monde.',
    blocks: [
      { type: 'p', text: 'Il est dit dans le rite d’ordination sacerdotale :' },
      { type: 'quote', text: 'Tu veux, Seigneur, que ton peuple tout entier participe au sacerdoce de ton Fils ; et Tu confies à certains de ses membres la charge de le sanctifier, de le conduire et de l’enseigner au nom du Christ. Accorde à N., dont Tu vas faire son prêtre, la grâce d’être fidèle à sa mission. Que par son ministère et toute sa vie, il aide les hommes et serve ta Gloire. Amen.', source: 'Rite d’ordination sacerdotale' },
      { type: 'p', text: 'Cette charge d’« enseigner au nom du Christ » ne va pas de soi, elle exige l’acquisition nécessaire de la connaissance des « études ecclésiastiques » et d’autres connaissances sur l’homme et sur le monde.' },
      { type: 'p', text: 'L’acquisition de ces connaissances se fait au Séminaire où le temps consacré aux études est le plus volumineux dans ces maisons de formation. Ce qui fait comprendre l’importance de la dimension intellectuelle pour la formation sacerdotale. La mise en garde du Pape François concernant l’importance de la dimension intellectuelle est pertinente :' },
      { type: 'quote', text: 'Le monde ne tolère pas la piètre figure d’un prêtre qui ne comprend pas les choses, qui n’a pas de méthode pour comprendre les choses et qui ne sait pas dire les choses de Dieu de manière fondée.', source: 'Pape François, décembre 2016' },
      { type: 'p', text: 'Conformément aux normes exigées par le décret conciliaire Optatam Totius N°16, les études se répartissent en trois grandes parties :' },
      {
        type: 'list',
        items: [
          { label: 'L’Écriture Sainte — cinq professeurs', text: 'Une grande place à l’Écriture Sainte : toute la Bible est étudiée pendant les trois années de présence ici au Séminaire.' },
          { label: 'La Théologie dogmatique — neuf professeurs', text: 'La Christologie, la Pneumatologie, les Sacrements, l’Ecclésiologie, la Théologie trinitaire, la Théologie spirituelle, la Mariologie et la Dogmatique spéciale (Théologie de la Sainte Trinité, Théologie de la Création, Théologie du Péché originel et Théologie de la Grâce).' },
          { label: 'Les autres disciplines théologiques — quinze professeurs', text: 'Code de Droit canonique, Œcuménisme, Latin, Morale fondamentale, Morale sociale, Bioéthique, Liturgie, Musique sacrée, Missiologie, Histoire de l’Église, Histoire de l’Église à Madagascar, Histoire des Conciles, Anthropologie, Théologie des religions et Pastorale pratique.' },
        ],
      },
      { type: 'p', text: 'À chaque fin de semestre, les séminaristes passent aux examens les matières étudiées tandis que trois Travaux Pratiques de dix à quinze pages chacun doivent être faits chaque année académique.' },
      { type: 'p', text: 'Le Séminaire organise chaque année un symposium dont le thème est varié suivant les circonstances et est présenté par quatre professeurs du Séminaire. Ce symposium sert surtout de séparer les deux semestres de l’année académique.' },
    ],
  },
  {
    id: 'pastorale',
    Icon: FaChurch,
    title: 'La dimension pastorale',
    fullTitle: 'La dimension pastorale de la formation en vue du Sacerdoce',
    excerpt: 'Toute la formation sacerdotale est en vue de la pastorale : elle doit avoir « un caractère essentiellement pastoral » (Pastores Dabo Vobis N°57).',
    blocks: [
      { type: 'p', text: 'Toute la formation sacerdotale est en vue de la pastorale. L’exhortation post-synodale du Pape Jean-Paul II est explicite sur ce point :' },
      { type: 'quote', text: 'Toute la formation des candidats au sacerdoce est destinée à les disposer d’une façon plus particulière à communier à la charité du Christ Bon Pasteur. Cette formation doit donc, dans ses divers aspects, avoir un caractère essentiellement pastoral.', source: 'Pastores Dabo Vobis N°57' },
      { type: 'quote', text: 'Le souci pastoral qui doit informer toute la formation des séminaristes exige aussi qu’ils reçoivent une préparation en ce qui concerne spécialement le ministère… Aussi, déjà pendant leurs études, ainsi que pendant les vacances, doivent-ils s’initier à la pratique de l’apostolat par des activités bien choisies.', source: 'Optatam Totius N°19.21' },
      { type: 'p', text: 'En général, le ministère exercé par les séminaristes au GSTF se divise en trois :' },
      {
        type: 'list',
        items: [
          { label: 'Le ministère auprès des écoles catholiques', text: 'Enseignement de la catéchèse.' },
          { label: 'Le ministère dans les paroisses', text: '' },
          { label: 'Le ministère auprès des aumôneries catholiques', text: '' },
        ],
      },
      { type: 'p', text: 'Les séminaristes en première année sont répartis dans des écoles catholiques de la ville où ils vont tous les jeudis tandis que ceux de la deuxième et de la troisième année sont envoyés dans des paroisses et dans des aumôneries.' },
      { type: 'p', text: 'Chaque séminariste est présenté par le Séminaire au responsable de chaque poste par une lettre d’envoi au début de l’année académique tout en indiquant l’importance du ministère pour la formation en vue du sacerdoce. Il est convié aux séminaristes de bien s’entretenir avec ces responsables de ces postes à qui le Séminaire demande un rapport des activités pastorales vers la fin de l’année académique.' },
      { type: 'p', text: 'Comme chaque année, à la fête de Sainte Thérèse de l’Enfant-Jésus, la patronne du Séminaire, les séminaristes en quatrième année de Théologie s’engagent au service de lectorat et d’acolytat. Ils exercent ce service ici au Séminaire et là où ils sont envoyés en ministère. Les Prêtres responsables des paroisses sont avisés par le recteur du Séminaire de cette institution.' },
    ],
  },
];

const Practice = () => {
  // Index de la dimension ouverte dans le panneau (null = fermé)
  const [openIndex, setOpenIndex] = useState(null);
  const [lastIndex, setLastIndex] = useState(0);

  const open = (index) => {
    setOpenIndex(index);
    setLastIndex(index);
  };
  const close = () => setOpenIndex(null);

  // Le panneau garde son contenu pendant l'animation de fermeture
  const current = dimensions[lastIndex];
  const prev = dimensions[lastIndex - 1];
  const next = dimensions[lastIndex + 1];

  const renderCard = (dimension) => {
    const index = dimensions.indexOf(dimension);
    const { Icon } = dimension;
    return (
      <div key={dimension.id} className="gtco-practice-area-item animate-box">
        <div className="gtco-icon">
          <Icon size={50} color="#855d08" />
        </div>
        <div className="gtco-copy">
          <h3>{dimension.title}</h3>
          <p>
            {dimension.excerpt}{' '}
            <a
              href={`#${dimension.id}`}
              translate="no"
              onClick={(e) => {
                e.preventDefault();
                open(index);
              }}
            >
              Lire la suite →
            </a>
          </p>
        </div>
      </div>
    );
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
              <h1>La formation</h1>
              <p className="sub">
                Les quatre dimensions de la formation au Grand Séminaire, considérée comme « la base nécessaire et dynamique de toute la vie presbytérale » (Ratio Fundamentalis Institutionis Sacerdotalis 89)
              </p>
            </div>
          </div>
          <div className="row">
            {/* Colonne de gauche : humaine, spirituelle */}
            <div className="col-md-6">{dimensions.slice(0, 2).map(renderCard)}</div>
            {/* Colonne de droite : intellectuelle, pastorale */}
            <div className="col-md-6">{dimensions.slice(2).map(renderCard)}</div>
          </div>
        </div>
      </section>

      <SidePanel
        isOpen={openIndex !== null}
        onClose={close}
        eyebrow={`Formation · ${lastIndex + 1} / ${dimensions.length}`}
        title={current.fullTitle}
        footer={
          <>
            {prev && (
              <button type="button" className="panel-nav-btn" onClick={() => open(lastIndex - 1)}>
                <small>← Précédente</small>
                <span>{prev.title}</span>
              </button>
            )}
            {next && (
              <button type="button" className="panel-nav-btn panel-nav-btn--next" onClick={() => open(lastIndex + 1)}>
                <small>Suivante →</small>
                <span>{next.title}</span>
              </button>
            )}
          </>
        }
      >
        <PanelBlocks blocks={current.blocks} />
      </SidePanel>
    </>
  );
};

export default Practice;
