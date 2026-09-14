import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";

export function Footer() {
    const [email, setEmail] = useState("");
    const [newsletterMessage, setNewsletterMessage] = useState("");
    
    const { authToken } = useContext(AuthContext);

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault(); 

        if (!authToken) {
            setNewsletterMessage("Du skal være logget ind for at tilmelde dig nyhedsbrevet.");
            return;
        }

        try {
            const res = await fetch("http://localhost:4000/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${authToken}`
                },
                body: new URLSearchParams({ email: email })
            });

            if (res.ok) {
                setNewsletterMessage("Tusind tak! Du er nu tilmeldt nyhedsbrevet.");
                setEmail("");
            } else {
                setNewsletterMessage("Fejl: Denne e-mail er allerede tilmeldt i systemet.");
            }
        } catch (err) {
            setNewsletterMessage("Kunne ikke oprette forbindelse til serveren.");
            console.error(err);
        }
    };

    return (
        <footer className={style.footerStyle}>
            <div className={style.footerContainer}>
                
                {/* JOBSØGERE */}
                <section>
                    <h4>For jobsøgere</h4>
                    <nav aria-label="Jobsøger navigation">
                        <NavLink to="#">Din kundeside</NavLink>
                        <NavLink to="/registrer">Opret profil</NavLink>
                        <NavLink to="#">Gemte jobs</NavLink>
                    </nav>
                </section>

                {/* ARBEJDSGIVERE */}
                <section>
                    <h4>For arbejdsgivere</h4>
                    <nav aria-label="Arbejdsgiver navigation">
                        <NavLink to="#">Virksomhedsprofil</NavLink>
                        <NavLink to="#">Opret annonce</NavLink>
                        <NavLink to="#">Jobannoncering</NavLink>
                        <NavLink to="#">Rekruttering</NavLink>
                    </nav>
                </section>

                {/* INTERNE LINKS */}
                <section>
                    <h4>Links</h4>
                    <nav aria-label="Informationel navigation">
                        <NavLink to="#">Om Gratissimo</NavLink>
                        <NavLink to="#">Job hos os</NavLink>
                        <NavLink to="#">For investorer</NavLink>
                        <NavLink to="#">Presse</NavLink>
                    </nav>
                </section>

                {/* FORMULAR */}
                <section className={style.newsletterSection}>
                    <h4>Vil du have jobs direkte i din indbakke?</h4>
                    <p>Tilmeld dig vores elektroniske nyhedsbrev</p>

                    <form onSubmit={handleNewsletterSubmit} className={style.newsletterForm}>
                        <label htmlFor="footer-newsletter-email" className={style.visuallyHidden}>
                            Indtast din e-mailadresse for at tilmelde dig nyhedsbrevet
                        </label>
                        
                        <div className={style.inputGroup}>
                            <input 
                                id="footer-newsletter-email"
                                type="email" 
                                placeholder="@ Indtast email..." 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                aria-required="true"
                            />
                            <button type="submit" className={style.submitBtn} />
                        </div>
                    </form>
                    {newsletterMessage && <p className={style.newsletterAlert}>{newsletterMessage}</p>}
                </section>

                {/* KONTAKT & SOCIALE MEDIER */}
                <section className={style.contactSection}>
                    <address className={style.addressBlock}>
                        <p>Fidusvej 23</p>
                        <p>9230 Øster Lundby</p>
                        <p>Tel: +45 22 13 22 13</p>
                    </address>
                    
                    <nav className={style.socialNav} aria-label="Sociale medier navigation">
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="Besøg vores LinkedIn profil">
                            <img src="/icons/SoMe/LinkedIn Circle.png" alt="LinkedIn" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Besøg vores Facebook side">
                            <img src="/icons/SoMe/Facebook.png" alt="Facebook" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Besøg vores Instagram profil">
                            <img src="/icons/SoMe/Instagram Circle.png" alt="Instagram" />
                        </a>
                        <a href="https://google.com" target="_blank" rel="noreferrer" aria-label="Besøg vores Google Plus profil">
                            <img src="/icons/SoMe/Google Plus.png" alt="Google Plus" />
                        </a>
                    </nav>
                </section>

            </div>
        </footer>
    );
}