import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContextProvider';

export function LoginPage() {
    const { authToken, setAuthToken, logout } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    const login = async (e) => {
        e.preventDefault();
        setMessage("");
        
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await fetch("http://localhost:4000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            
            if (res.ok) {
                setAuthToken(data?.accessToken); 
                setMessage("Du er nu logget ind!");
            } else {
                setMessage(`Fejl: ${data.message || "Forkert login"}`);
            }
        } catch (err) {
            setMessage("Kunne ikke oprette forbindelse til serveren.");
        }
    };

    return (
        <main>
            {!authToken ? (
                <>
                    {/* INFOBOX */}
                    <header>
                        <h1>Log ind eller opret dig som bruger</h1>
                        <p>
                            Når du opretter en profil på Gratissimo får du adgang til at oprette, slette og
                            redigere i job annoncer. Som privatperson får du mulighed for at gemme de jobs
                            du kunne være interesseret i.
                        </p>
                        <NavLink to="/registrer" style={{ color: "#AB0E0E" }}>Log ind for at gå til min side</NavLink>
                    </header>

                    {/* LOGIN FORM */}
                    <section>
                        <h2>Log ind</h2>
                        <br />
                        <form onSubmit={login}>
                            <label >
                                Email
                                <input type="email" name="email" placeholder="Skriv din email..." required />
                            </label>

                            <label >
                                Password
                                <input type="password" name="password" placeholder="Skriv dit password..." required />
                            </label>

                            <input type="submit" value="Log ind" />
                        </form>

                        {message && <p><b>{message}</b></p>}
                        <br />
                        <NavLink to="/registrer" style={{ color: "#AB0E0E" }}>Opret bruger</NavLink>
                    </section>
                </>
            ) : (
                /* IF LOG IN */
                <section style={{ textAlign: "center", padding: "60px 0" }}>
                    <h1>Du er logget ind!</h1>
                    <p>Din session er active med dit Bearer Token gemt sikkert i browserens cookies.</p>
                    <br />
                    <NavLink to="/" style={{ color: "#AB0E0E"}}>Gå til forsiden</NavLink>
                    <br /><br />
                    <button type="button" onClick={logout}>
                        Log ud nu
                    </button>
                </section>
            )}
        </main>
    );
}