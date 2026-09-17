import React, { useContext } from 'react';
import style from './AuthHeader.module.scss';

export function AuthHeader({ children }) {
    return (
        <header className={style.infoSection}>
            {children} 
        </header>
    );
}