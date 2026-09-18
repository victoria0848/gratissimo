import React, { useState } from 'react';
import style from './JobCard.module.scss';

export function JobCard({ 
    id, 
    title, 
    company, 
    location, 
    category, 
    arbejdstid, 
    description, 
    adresse, 
    zipcode, 
    city, 
    workHome, 
    createdAt,
    onGemFavorit,
    isProfilePage = false, 
    activeTab = ""
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const formatertDato = createdAt ? createdAt.substring(0, 10).split('-').reverse().join('/') : "Ikke oplyst";

    const renderButtons = () => {
        if (isProfilePage && activeTab === "annoncer") {
            return (
                <>
                    <button type="button" onClick={() => onGemFavorit(id)} className={style.sletBtn}>Slet</button>
                    <button type="button" className={style.redigerBtn}>Rediger</button>
                </>
            );
        } 
        else if (isProfilePage && activeTab === "favoritter") {
            return (
                <>
                    <button type="button" onClick={() => onGemFavorit(id)} className={style.gemHeartBtn}>Fjern</button>
                    <button type="button" onClick={() => setIsExpanded(!isExpanded)} className={style.aabenBtn}>
                        {isExpanded ? "Luk" : "Åben"}
                    </button>
                </>
            );
        } 
        else {
            // Standardsiden (Søgesiden / Forsiden)
            return (
                <>
                    <button type="button" onClick={() => onGemFavorit(id)} className={isExpanded ? style.gemHeartBtn : style.gemBtn}>Gem</button>
                    <button type="button" onClick={() => setIsExpanded(!isExpanded)} className={isExpanded ? style.lukBtn : style.aabenBtn}>
                        {isExpanded ? "Luk" : "Åben"}
                    </button>
                </>
            );
        }
    };

    return (
        <article className={style.jobCard}>
            
            {/* TOP AF KORTET*/}
            <section className={style.cardTopRow}>
                <div className={style.leftInfo}>
                    <span className={style.metaCompany}>{company}</span>
                    <h4>{title}</h4>
                    {isExpanded && <p className={style.categoryText}>Kategori: {category}</p>}
                    
                    {!isExpanded && (
                        <p className={style.teaserText}>
                            {description?.substring(0, 130)}...
                        </p>
                    )}
                </div>

                <div className={style.rightInfo}>
                    <ul>
                        <li><strong>Location:</strong> {location}</li>
                        <li><strong>Indrykket:</strong> {formatertDato}</li>
                        {isExpanded && (
                            <>
                                <li><strong>Arbejdstid:</strong> {arbejdstid}</li>
                                <li><strong>Arbejdsplads:</strong> {workHome}</li>
                            </>
                        )}
                    </ul>
                </div>
            </section>

            {/* DEN UDVIDEDE SEKTION */}
            {isExpanded && (
                <section className={style.expandedContent} aria-label="Udvidede jobdetaljer">
                    
                    {/* Venstre side */}
                    <section className={style.detailsLeft}>
                        <article>
                            <h5>Beskrivelse</h5>
                            <p>{description}</p>
                        </article>

                        <article>
                            <h5>Arbejdsform og rammer</h5>
                            <p>Dette job udføres som {workHome} hos {company}. Vi forventer, at du kan indgå stabilt i vores ugentlige {arbejdstid}s-vagt.</p>
                        </article>
                    </section>

                    {/* Højre side */}
                    <aside className={style.detailsRight}>
                        <h5>Mødested & Kontakt</h5>
                        <address className={style.contactAddress}>
                            <p className={style.contactName}>{company}</p>
                            <br />
                            <p>{adresse}</p>
                            <p>{zipcode} {city}</p>
                            <p>Region: {location}</p>
                        </address>
                    </aside>

                </section>
            )}

            {/* BUTTONS */}
           <footer className={style.cardActions}>
                {renderButtons()}
            </footer>

        </article>
    );
}