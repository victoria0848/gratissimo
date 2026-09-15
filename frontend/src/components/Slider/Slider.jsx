import React, { useState, useEffect } from 'react';
import style from './Slider.module.scss';

export function Slider() {
    const [sliderIndex, setSliderIndex] = useState(0);

    const anmeldelser = [
        { text: "Gratissimo hjalp mig med at finde det perfekte frivillige job i min lokale sportsklub!", name: "Mads Hansen" },
        { text: "Super nem og overskuelig hjemmeside. Varm anbefaling herfra.", name: "Sarah Jensen" },
        { text: "Fantastisk platform for foreninger, der mangler hænder i hverdagen.", name: "Lars Olsen" }
    ];

    //TIMER
    useEffect(() => {
        const timer = setInterval(() => {
            setSliderIndex((prevIndex) => 
                prevIndex >= anmeldelser.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); 

        return () => clearInterval(timer);
    }, [sliderIndex]);

    useEffect(() => {
        const timer = setInterval(() => {
            forward(); 
        }, 5000); 

        return () => clearInterval(timer); 
    }, [sliderIndex]);

    return (
        <figure className={style.sliderStyle}>
            <blockquote className={style.quote}>
                "{anmeldelser[sliderIndex].text}"
            </blockquote>
            <figcaption className={style.author}>
            {anmeldelser[sliderIndex].name}
            </figcaption>
        </figure>
    );
}