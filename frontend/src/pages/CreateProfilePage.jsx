import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthHeader } from '../components/AuthHeader/AuthHeader'; 
import style from './LoginPage.module.scss';

export function CreateProfilePage() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        setMessage("");

        const email = e.target.email.value;
        const password = e.target.password.value;
        const repeatPassword = e.target.repeatPassword.value;
        const firstname = e.target.firstname.value;
        const lastname = e.target.lastname.value;
        const phone = e.target.phone.value;

        if (password !== repeatPassword) {
            setMessage("Fejl: Adgangskoderne er ikke ens.");
            return;
        }

        try {
            const res = await fetch("http://localhost:4000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, firstname, lastname, phone })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Profilen blev oprettet! Du viderestilles til login...");
                setTimeout(() => {
                    navigate("/login"); 
                }, 2000);
            } else {
                setMessage(`Fejl: ${data.message || "Kunne ikke oprette profil"}`);
            }
        } catch (err) {
            setMessage("Kunne ikke oprette forbindelse til serveren.");
        }
    };

    return (
        <main className="container">
            <AuthHeader />

            // Create profile
            <section className={style.formWrapper}>
                <h2>Opret ny profil</h2>
                <br />
                <form onSubmit={register} className={style.authForm}>
                    <label>
                        Email
                        <input type="email" name="email" placeholder="Skriv din email..." required />
                    </label>

                    <label>
                        Password
                        <input type="password" name="password" placeholder="Skriv dit password..." required />
                    </label>

                    <label>
                        Gentag password
                        <input type="password" name="repeatPassword" placeholder="Skriv dit password..." required />
                    </label>

                    <label>
                        Fornavn
                        <input type="text" name="firstname" placeholder="Skriv dit fornavn..." required />
                    </label>

                    <label>
                        Efternavn
                        <input type="text" name="lastname" placeholder="Skriv dit efternavn..." required />
                    </label>

                    <label>
                        Telefon nummer
                        <input type="tel" name="phone" placeholder="Skriv dit telefon nummer..." required />
                    </label>

                    <input type="submit" value="Opret profil" className={style.submitBtn}/>
                </form>

                
                {message && <b className={style.feedbackMsg}>{message}</b>}
                <br />
                <NavLink to="/login" className={style.toggleLink}>Log ind</NavLink>
            </section>
        </main>
    );
}