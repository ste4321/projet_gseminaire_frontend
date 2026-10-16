import { NavLink } from "react-router";
import React from "react";

const Footer = () => {
    return (
    <>
        <footer id="gtco-footer" role="contentinfo">
		<div className="container">

			<div className="row copyright">
				<div className="col-md-12">
					<p className="pull-left">
						 <small className="block">© {new Date().getFullYear()} Grand Séminaire de Théologie Faliarivo — <NavLink to="/">G.S.T.F</NavLink></small>
					</p>
					{/* Réseaux sociaux : ajouter ici uniquement les comptes officiels, ex. :
					<ul className="gtco-social-icons pull-right">
						<li><a href="https://www.facebook.com/..." target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="icon-facebook"></i></a></li>
					</ul>
					*/}
				</div>
			</div>
		</div>
	</footer>
    </>
    );
  };

  export default Footer;
