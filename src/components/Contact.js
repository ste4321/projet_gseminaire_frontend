import React, { useCallback, useEffect, useRef, useState } from "react";
import "./../App.css";
import "../styles/contact.css";
import { API_URL } from "../config";
import { useLangue } from "../i18n";

// Formulaire « Contactez-nous » : le message est enregistré par l'API (POST /postContact)
// et apparaît dans l'application de gestion, page « Messages » de l'administration.
// Envoi réussi : fenêtre de confirmation (« nous vous répondrons… »).

const FORMULAIRE_VIDE = { name: "", email: "", message: "" };
const MAX_MESSAGE = 5000; // même limite que le serveur

/** Fenêtre de confirmation après l'envoi : Échap, clic à côté ou bouton pour fermer */
const PopupEnvoye = ({ email, c, onClose }) => {
    const bouton = useRef(null);

    useEffect(() => {
        bouton.current?.focus();
        const echap = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", echap);
        document.body.classList.add("contact-popup-ouverte");
        return () => {
            document.removeEventListener("keydown", echap);
            document.body.classList.remove("contact-popup-ouverte");
        };
    }, [onClose]);

    return (
        <div className="contact-popup" onClick={onClose}>
            <div
                className="contact-popup__boite"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="contact-popup-titre"
                aria-describedby="contact-popup-texte"
                onClick={(e) => e.stopPropagation()}
            >
                <span className="contact-popup__icone" aria-hidden="true">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                </span>
                <h3 id="contact-popup-titre">{c.popupTitre}</h3>
                <p id="contact-popup-texte">{c.popupTexte(email)}</p>
                <button ref={bouton} type="button" className="btn btn-primary contact-popup__ok" onClick={onClose}>
                    {c.popupOk}
                </button>
            </div>
        </div>
    );
};

const Contact = () => {
    const { t } = useLangue();
    const c = t.contact;

    const [formData, setFormData] = useState(FORMULAIRE_VIDE);
    const [siteWeb, setSiteWeb] = useState(""); // piège à robots (champ invisible)
    const [envoi, setEnvoi] = useState(false);
    const [erreur, setErreur] = useState(null); // clé du message d'erreur (erreurChamps, erreurTrop, erreurReseau)
    const [envoyeA, setEnvoyeA] = useState(null); // adresse du dernier envoi réussi : ouvre la fenêtre de confirmation
    const fermerPopup = useCallback(() => setEnvoyeA(null), []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (erreur) setErreur(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (envoi) return;
        setEnvoi(true);
        setErreur(null);
        try {
            const response = await fetch(`${API_URL}/postContact`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({ ...formData, site_web: siteWeb }),
            });
            if (response.ok) {
                setEnvoyeA(formData.email.trim());
                setFormData(FORMULAIRE_VIDE);
            } else {
                // Messages du serveur en anglais : on affiche le nôtre, dans la langue choisie
                setErreur(response.status === 422 ? "erreurChamps" : response.status === 429 ? "erreurTrop" : "erreurReseau");
            }
        } catch {
            setErreur("erreurReseau");
        } finally {
            setEnvoi(false);
        }
    };

    return (
        <section id="gtco-contact" data-section="contact">
            <div className="container">
                <div className="row row-pb-md">
                    <div className="col-md-8 col-md-offset-2 heading animate-box">
                        <h1>{c.titre}</h1>
                        <p className="sub">{c.citation}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-push-6 animate-box">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="sr-only">{c.nom}</label>
                                <input type="text" className="form-control" placeholder={c.phNom} id="name" name="name" maxLength={255} autoComplete="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="sr-only">{c.email}</label>
                                <input type="email" className="form-control" placeholder={c.phEmail} id="email" name="email" maxLength={255} autoComplete="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" className="sr-only">{c.message}</label>
                                <textarea name="message" id="message" className="form-control" cols="30" rows="7" maxLength={MAX_MESSAGE} placeholder={c.phMessage} value={formData.message} onChange={handleChange} required></textarea>
                            </div>
                            {/* Invisible pour les visiteurs (et ignoré par les lecteurs d'écran) : seuls les robots le remplissent */}
                            <div className="contact-piege" aria-hidden="true">
                                <label htmlFor="site_web">Site web</label>
                                <input type="text" id="site_web" name="site_web" tabIndex={-1} autoComplete="off" value={siteWeb} onChange={(e) => setSiteWeb(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={envoi} aria-busy={envoi}>
                                    {envoi ? c.envoi : c.envoyer}
                                </button>
                            </div>
                            {erreur && (
                                <p className="contact-erreur" role="alert">{c[erreur]}</p>
                            )}
                        </form>
                    </div>
                    <div className="col-md-4 col-md-pull-6 animate-box">
					<div className="gtco-contact-info">
						<ul>
							<li className="address">Grand Séminaire de Théologie <br /> Faliarivo-Ambanidia BP. 6047 <br /> 101 ANTANANARIVO - MADAGASCAR
</li>
							<li className="phone"><a href="tel:+261382122021">+261 38 21 220 21</a></li>
							<li className="email"><a href="mailto:seminairetheo@yahoo.fr">seminairetheo@yahoo.fr</a></li>
							<li className="url"><a href="https://www.gstf-faliarivo.org" target="_blank" rel="noopener noreferrer">www.gstf-faliarivo.org</a></li>
						</ul>
					</div>
				</div>
                </div>
            </div>
            {envoyeA && <PopupEnvoye email={envoyeA} c={c} onClose={fermerPopup} />}
        </section>
    );
};

export default Contact;
