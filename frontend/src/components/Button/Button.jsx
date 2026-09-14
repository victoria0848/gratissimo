import React from 'react';
import style from './Button.module.scss';

export function Button({ text, type = "button", onClick, variant = "primary" }) {
    const buttonClass = variant === "action" ? style.actionBtn : style.primaryBtn;

    return (
        <button 
            type={type} 
            onClick={onClick} 
            className={buttonClass}
        >
            {text}
        </button>
    );
}