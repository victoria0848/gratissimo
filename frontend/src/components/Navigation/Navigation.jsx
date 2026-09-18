import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import style from "./Navigation.module.scss";

export function Navigation() {
    const { authToken, logout } = useContext(AuthContext);

    // SET CLASS ON IF ACTIVE
    const checkActive = ({ isActive }) => isActive ? style.active : "";

    return (
        <header className={style.mainHeader}>
            <div className={style.headerContainer}>
                
                {/* LOGO  */}
                <NavLink to={"/"} className={style.logoLink}>
                    <figure className={style.logoFrame}>
                        <img src="/logo/logo-white.png" alt="Gratissimo-Logo" className={style.logoImage} />
                    </figure>
                </NavLink>
            </div>

            {/* NAVBAR */}
        <nav className={style.navBar}>
            <div className={style.navContainer}>
            
            {/* LINKS */}
            <ul className={style.leftLinks}>
            <li>
                <NavLink to={"/jobs"} className={checkActive}>Alle Jobs</NavLink>
            </li>
            <li>
                <NavLink to={"/opret"} className={checkActive}>Opret annonce</NavLink>
            </li>
            <li>
                <NavLink to={"/nyheder"} className={checkActive}>Nyheder</NavLink>
            </li>
            </ul>
            {/* PROFILE / LOGIND LINKS*/}
            <div className={style.rightLinks}>
            {!authToken ? (
                <>
                    <NavLink to={"/registrer"} className={style.registerLink}>Opret Profil</NavLink>
                    <span className={style.divider}>|</span>
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
                            <span className={style.divider}>|</span>
                            <button onClick={logout} className={style.logoutBtn}>Log ud</button>
                        </>
                    )}
                </div>
                </div>
        </nav>
        </header>
    );
}