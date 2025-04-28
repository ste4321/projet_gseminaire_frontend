import React from "react";

const Team = () => {
    return (
    <>
        <section id="gtco-our-team" data-section="our-team">
            <div className="container">
                <div className="row row-pb-md">
                    <div className="col-md-8 col-md-offset-2 heading animate-box" data-animate-effect="fadeIn">
                        <h1>Notre équipes</h1>
                        <p className="sub">Les éducateurs du Grand Séminaire de Théologie à Faliarivo</p>
                        {/* <p className="subtle-text animate-box" data-animate-effect="fadeIn">Équipes</p> */}
                    </div>
                </div>
                <div className="row team-item gtco-team-reverse">
                    <div className="col-md-6 col-md-push-7 animate-box" data-animate-effect="fadeInRight">
                        <div className="img-shadow">
                            <img src="images/Arriv俥 au GSTF.webp" className="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co" />
                        </div>
                    </div>
                    <div className="col-md-6  col-md-pull-6 animate-box" data-animate-effect="fadeInRight">
                        <h2>Parole du Recteur</h2>
                        <p>Les éducateurs au Grand Séminaire de Faliarivo sont au nombre de cinq prêtres avec une religieuse pour s’occuper de l’intendance. La répartition des tâches suit fidèlement les consignes de la nouvelle Ratio Fundamentalis (Rome 2016) pour la formation des prêtres. Le Grand Séminaire étant de l’Archidiocèse du Centre, les éducateurs sont originaires de cette Circonscription Ecclésiale du Centre.</p>
                        <p>L’équipe formatrice au moment actuel est dirigée par le Recteur qui s’occupe aussi de la coordination de la dimension pastorale. Un deuxième prêtre se charge de la dimension humaine ; le troisième prêtre pour la dimension spirituelle ; le quatrième prêtre pour la dimension intellectuelle et le cinquième prêtre pour l’économat.
                        </p>
                        <p>À part ces éducateurs résidents au Séminaire, les enseignants, en majorité des prêtres, sont aussi sollicités à apporter leur contribution non seulement à la transmission de connaissance mais aussi à la formation intégrale des candidats. Il y a aussi les prêtres désignés par leur diocèse respectif pour servir de lien entre le Séminaire et le diocèse : ce sont les correspondants diocésains.
</p>
                    </div>
                </div>

                <div className="row team-item gtco-team">
                    <div className="col-md-6 col-md-pull-1 animate-box"  data-animate-effect="fadeInLeft">
                        <div className="img-shadow">
                            <img src="images/Messe pr俿id俥 par SEm le Cardinal.webp" className="img-responsive" alt="Free HTML5 Bootstrap Template by FreeHTML5.co" />
                        </div>
                    </div>
                    <div className="col-md-6 animate-box" data-animate-effect="fadeInLeft">
                        <h2>Le Cardinal Pietro Parolin au Grand Séminaire le 29 janvier 2017</h2>
                        <p>Un grand événement s’est passé ici au Grand Séminaire de Théologie à Faliarivo au mois de janvier 2017. Le Cardinal Pietro Parolin, Secrétaire d’État du Vatican est venu à Madagascar pour marquer la célébration du cinquantième anniversaire de la relation diplomatique entre le Saint Siège et Madagascar.</p>
                        <p>Dans cette occasion, il a aussi rendu visite au Grand Séminaire où il a présidé la célébration eucharistique dans la grande chapelle le 29 janvier 2017 avec tous les évêques de Madagascar, avec le Cardinal Piat de l’Île Maurice et Mgr Aubry de l’Île de La Réunion. Toute la grande famille du Séminaire est présente lors de cet événement historique que nous avons considéré comme un « temps de grâce ».</p>
                        <p>En commentant l’Évangile du jour et qui parle de la guérison de la femme hémorragique et de la résurrection de la fille de Jaïre (Mc 5, 21-43), le Cardinal Parolin exhorte les séminaristes à avoir « toujours confiance en Dieu » et à s’abandonner à lui sans rien « tenir pour soi » dans un parcours de « christification » progressive. Il invite aussi les séminaristes à grandir « intérieurement dans les vérités de la foi pour en témoigner et les offrir aux autres, aux communautés » qui leur « seront confiées ».</p>
                    </div>
                </div>

            </div>
	    </section>
    </>
    );
  };
  
  export default Team;
  