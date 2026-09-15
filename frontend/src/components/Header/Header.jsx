import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';
import style from './Header.module.scss';

export function Header() {
    const { authToken } = useContext(AuthContext);

    return (
        <aside className={style.subHeader}>
            <p className={style.infoText}>
                Vi hjælper dig på vej til dit næste frivillige job
            </p>

            {!authToken && (
                <NavLink to="/login" className={style.loginCta}>
                    Log ind eller opret dig
                </NavLink>
            )}
        </aside>
    );
}