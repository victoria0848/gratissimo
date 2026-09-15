import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { Slider } from '../components/Slider/Slider';
import style from './Frontpage.module.scss'; 

export function Frontpage() {
    // LOCAL STATES
    const [searchQuery, setSearchQuery] = useState("");
    const [geografi, setGeografi] = useState("");
    const [kategori, setKategori] = useState("");
    const [arbejdstid, setArbejdstid] = useState("");
    const [periode, setPeriode] = useState("");
    const [hjemmearbejde, setHjemmearbejde] = useState("");

    const navigate = useNavigate();

    // DATA
    const { data: jobs } = useFetch("/job-listings");
    const { data: categories } = useFetch("/job-categories");
    const { data: news } = useFetch("/articles");

    // SØG & FILTRERING
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Pakker alle filtrene ind i URL'en som Query Parameters, præcis som kunden har bestilt
        navigate(`/jobs?search=${searchQuery}&geo=${geografi}&cat=${kategori}&tid=${arbejdstid}&periode=${periode}&type=${hjemmearbejde}`);
    };

    // NULSTIL KNAP
    const handleReset = () => {
        setSearchQuery("");
        setGeografi("");
        setKategori("");
        setArbejdstid("");
        setPeriode("");
        setHjemmearbejde("");
    };

    // NEWS
    const [randomNews, setRandomNews] = useState([]);
    useEffect(() => {
        if (news && news.length > 0) {
            const shuffled = [...news].sort(() => 0.5 - Math.random());
            setRandomNews(shuffled.slice(0, 3));
        }
    }, [news]);

    const getJobCount = (catId) => {
        if (!jobs) return 0;
        return jobs.filter(job => job.jobCategoryId === catId).length;
    };

    return (
        <main className={style.frontpageWrapper}>
            
            {/* SØG OG FILTRERING */}
            <section className={style.searchSection}>
            <h2>Søg frivilligt arbejde:</h2>
            <form onSubmit={handleSearchSubmit} className={style.searchForm}>
                <div className={style.searchBarRow}>
                <div className={style.inputWrapper}>
                    <img src="/icons/icons8-search50.png" alt="Søg" className={style.searchIcon} />
                    <input 
                        type="text" 
                        placeholder="Eks. cafémedhjælper..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={style.searchInput}
                    />
                    </div>
                    <button type="submit" className={style.searchBtn}>Søg</button>
               </div>
               <h3 className={style.filterTitle}>Filter:</h3>
                        <div className={style.filterRow}>
                            <select value={geografi} onChange={(e) => setGeografi(e.target.value)}>
                            <option value="">Region</option>
                            <option value="Nordjylland">Nordjylland</option>
                            <option value="Midtjylland">Midtjylland</option>
                            <option value="Syddanmark">Syddanmark</option>
                            <option value="Sjælland">Sjælland</option>
                            <option value="Hovedstaden">Hovedstaden</option>
                            </select>

                            <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
                                <option value="">Kategori</option>
                                {categories?.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>

                            <select value={arbejdstid} onChange={(e) => setArbejdstid(e.target.value)}>
                                <option value="">Arbejdstid </option>
                                <option value="Deltid">Deltid</option>
                                <option value="Fuldtid">Fuldtid</option>
                                <option value="Flex">Flex</option>
                            </select>

                            <select value={periode} onChange={(e) => setPeriode(e.target.value)}>
                                <option value="">Periode</option>
                                <option value="uge">Seneste uge</option>
                                <option value="maaned">Seneste måned</option>
                                <option value="aar">Seneste år</option>
                            </select>

                            <select value={hjemmearbejde} onChange={(e) => setHjemmearbejde(e.target.value)}>
                                <option value="">Hjemmearbejde</option>
                                <option value="On-site">On-site</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>

                        <div className={style.buttonRow}>
                            <button type="button" onClick={handleReset} className={style.resetBtn}>
                                Nulstil
                            </button>
                        </div>
                    </form>
            </section>

            {/* FIND JOB */}
            <section className={style.categorySection}>
                <h3>Find job ved kategori</h3>
                <div className={style.categoryGrid}>
                    {categories?.map(cat => (
                        <NavLink key={cat.id} to={`/jobs?cat=${cat.id}`} className={style.categoryCard}>
                        <span className={style.categoryName}>{cat.name}</span>
                            <span className={style.jobCount}>{getJobCount(cat.id)}</span>
                        </NavLink>
                    ))}
                </div>
            </section>

            {/* NEWS */}
            <section className={style.newsSection}>
                <h3>Udvalgte nyheder</h3>
                <div className={style.newsGrid}>
                    {randomNews.map(item => (
                        <NavLink key={item.id} to={`/nyheder?id=${item.id}`} className={style.newsCard}>
                            <figure>
                                <img src={`http://localhost:4000${item.imageUrl}`} alt={item.title} />
                            </figure>
                            <div className={style.newsContent}>
                                <h4>{item.title}</h4>
                                <p>{item.teaser || item.content?.substring(0, 100)}...</p>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </section>

            {/* REVIEWS */}
            <section className={style.reviewSection}>
                <h3>Hvad siger vores brugere?</h3>
                <Slider />
            </section>

        </main>
    );
}