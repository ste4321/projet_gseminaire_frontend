import React, { useState } from "react";
import "./../App.css";
import { API_URL } from "../config";
const Contact = () => {

    const [notification, setNotification] = useState({ message: "", type: "" });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/postContact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
            if (response.ok) {
                setNotification({ message: "Message envoyé avec succès !", type: "success" });
                setFormData({ name: "", email: "", message: "" });
            } else {
                setNotification({ message: result.message || "Une erreur est survenue.", type: "error" });
            }
        } catch (error) {
            setNotification({ message: "Une erreur est survenue.", type: "error" });
            console.error("Erreur :", error);
        }
    
        // Effacer la notification après 5 secondes
        setTimeout(() => {
            setNotification({ message: "", type: "" });
        }, 5000);
    };
    

    return (
        <section id="gtco-contact" data-section="contact">
            <div className="container">
                <div className="row row-pb-md">
                    <div className="col-md-8 col-md-offset-2 heading animate-box">
                        <h1>Contactez-nous</h1>
                        <p className="sub">Si vous ne croyez pas, vous ne comprendrez pas (Is 7, 9). </p>
                        {/* <p className="subtle-text animate-box">Contact</p> */}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-push-6 animate-box">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="sr-only">Nom</label>
                                <input type="text" className="form-control" placeholder="Votre nom" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="sr-only">Adresse e-mail</label>
                                <input type="email" className="form-control" placeholder="Votre adresse e-mail" id="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea name="message" id="message" className="form-control" cols="30" rows="7" placeholder="Votre message" value={formData.message} onChange={handleChange} required></textarea>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Envoyer" className="btn btn-primary" />
                            </div>
                            {notification.message && (
                                <div className={`notification ${notification.type}`}>
                                    {notification.message}
                                </div>
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
        </section>
    );
};

export default Contact;
