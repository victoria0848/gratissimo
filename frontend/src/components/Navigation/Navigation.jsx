import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import style from "./Navigation.module.scss";

export function Navigation() {
    const { authToken, logout } = useContext(AuthContext);

    return (
        <header className={style.mainHeader}>
        <nav className={style.navStyle}>
            {/* LOGO */}
            <NavLink to={"/"} className={style.logoLink}>
                <figure className={style.logoFrame}>
                    <img src="/logo/logo-white.png" alt="Gratissimo-Logo" className={style.logoImage} />
                </figure>
            </NavLink>
            
            {/* LINKS */}
            <ul>
            <li>
                <NavLink to={"/jobs"} className={({ isActive }) => isActive ? style.active : ""}>Alle Jobs</NavLink>
            </li>
            <li>
                <NavLink to={"/opret"} className={({ isActive }) => isActive ? style.active : ""}>Opret Annonce</NavLink>
            </li>
            <li>
                <NavLink to={"/nyheder"} className={({ isActive }) => isActive ? style.active : ""}>Nyheder</NavLink>
            </li>
            <li>
            {!authToken ? (
                <>
                    <NavLink to={"/registrer"} className={style.registerLink}>Opret Profil</NavLink>
                    <NavLink 
                        className={({ isActive }) => (isActive ? style.active : "")}
                        to={"/login"}
                    >
                        Log ind
                    </NavLink>
                </>
                    ) : (
                        <>
                            <NavLink to={"/profil"}>Min Profil</NavLink>
                            <button onClick={logout} className={style.logoutBtn}>Log ud</button>
                        </>
                    )}
                </li>
            </ul>
        </nav>
        </header>
    );
}