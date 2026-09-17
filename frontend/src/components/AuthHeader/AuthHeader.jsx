import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';

export function AuthHeader() {

    const { authToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();

     const handleLogoutClick = async () => {
        try {
             await fetch("http://localhost:4000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
        } catch (err) {
            console.error("API logout fejlede, men vi rydder klienten alligevel", err);
        }

        logout();
        
        // BACK TO LOGIN PAGE
        navigate("/login");
    };

    return (
         <header>
            
            {!authToken ? (
                /*  */
                <>
                    <h1>Log ind eller opret dig som bruger</h1>
                    <p>
                        Når du opretter en profil på Gratissimo får du adgang til at oprette, slette og
                        redigere i job annoncer. Som privatperson får du mulighed for at gemme de jobs
                        du kunne være interesseret i.
                    </p>
                    <NavLink to="/login" style={{ color: "#AB0E0E", textDecoration: "underline" }}>
                        Log ind for at gå til min side
                    </NavLink>
                </>
            ) : (
                /* LOGGET IN  */
                <>
                    <h1>Velkommen {authToken?.user?.firstname}</h1>
                    
                    <nav>
                        {/* EDIT PROFILE*/}
                        <NavLink to="/rediger-profil" style={{ color: "#AB0E0E", textDecoration: "underline" }}>
                            Rediger profil
                        </NavLink>
                        
                        <span>|</span>
                        
                        {/* LOG OUT */}
                        <button 
                            type="button" 
                            onClick={handleLogoutClick}
                            style={{ background: "none", border: "none", color: "#AB0E0E", textDecoration: "underline", cursor: "pointer", padding: 0, font: "inherit" }}
                        >
                            Log ud
                        </button>
                    </nav>
                </>
            )}

        </header>
    );
}