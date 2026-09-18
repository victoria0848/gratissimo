import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContextProvider';
import { AuthHeader } from '../components/AuthHeader/AuthHeader'; 
import style from './LoginPage.module.scss'; 

export function LoginPage() {
    const { authToken, setAuthToken, logout } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        setMessage("");
        
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
             const res = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    username: email, 
                    password: password 
                }),
            });
           const data = await res.json().catch(() => ({}));
            
           if (res.ok) {
                setAuthToken(data?.accessToken); 
                setMessage("Du er nu logget ind!");
                //BACK TO LOGIN
                navigate("/profil");
            } else {
                setMessage(`Fejl: ${data.message || "Forkert login eller adgangskode"}`);
            }
        } catch (err) {
            setMessage("Kunne ikke oprette forbindelse til serveren.");
        }
    };

    return (
        <main className="container">
            <AuthHeader />

            {!authToken ? (
                <>
                    {/* LOGIN FORM */}
                    <section className={style.formWrapper}>
                        <h2>Log ind</h2>

                        <form onSubmit={login} className={style.authForm}>
                            <label >
                                Email
                                <input type="email" name="email" placeholder="Skriv din email..." required />
                            </label>

                            <label >
                                Password
                                <input type="password" name="password" placeholder="Skriv dit password..." required />
                            </label>

                            <input type="submit" value="Log ind" className={style.submitBtn} />
                        </form>

                        {message && <b className={style.feedbackMsg}>{message}</b>}
                        <br />
                        <NavLink to="/registrer" className={style.submitBtn}>Opret bruger</NavLink>
                    </section>
                </>
            ) : (
                /* IF LOG IN */
                <section className={style.successWrapper}>
                    <h1>Du er logget ind!</h1>
                    <br />
                    <NavLink to="/" className={style.toggleLink}>Gå til forsiden</NavLink>
                    <br /><br />
                    <button type="button" onClick={logout} className={style.logoutBtn}>
                        Log ud nu
                    </button>
                </section>
            )}
        </main>
    );
}