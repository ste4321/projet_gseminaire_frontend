import { NavLink } from "react-router";
// import { FaUser } from 'react-icons/fa'; // Icône utilisateur
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ← Importer ici

const Footer = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
    return (
    <>
        <footer id="gtco-footer" role="contentinfo">
		<div className="container">
			
			<div className="row copyright">
				<div className="col-md-12">
					<p className="pull-left">
						 <small className="block">Copyright Grand Séminaire de Théologie Faliarivo <NavLink to="/">G.S.T.F 2025</NavLink></small>
					</p>
						<ul className="gtco-social-icons pull-right">
							<li><NavLink to="/"><i className="icon-twitter"></i></NavLink></li>
							<li><NavLink to="/"><i className="icon-facebook"></i></NavLink></li>
							<li><NavLink to="/"><i className="icon-linkedin"></i></NavLink></li>
							<li><NavLink to="/"><i className="icon-dribbble"></i></NavLink></li>
							
						</ul>
				</div>
			</div>
		</div>
	</footer> 
    </>
    );
  };
  
  export default Footer;
  