import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import style from './SearchBar.module.scss'; 

export function SearchBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const { data: categories } = useFetch("/job-categories");

    // LOCAL STATES
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
    const [geografi, setGeografi] = useState(searchParams.get('geo') || "");
    const [kategori, setKategori] = useState(searchParams.get('cat') || "");
    const [arbejdstid, setArbejdstid] = useState(searchParams.get('tid') || "");
    const [periode, setPeriode] = useState(searchParams.get('periode') || "");
    const [hjemmearbejde, setHjemmearbejde] = useState(searchParams.get('type') || "");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Navigerer og opdaterer adressebaren med query-parametre live
        navigate(`/jobs?search=${searchQuery}&geo=${geografi}&cat=${kategori}&tid=${arbejdstid}&periode=${periode}&type=${hjemmearbejde}`);
    };

    const handleReset = () => {
        setSearchQuery("");
        setGeografi("");
        setKategori("");
        setArbejdstid("");
        setPeriode("");
        setHjemmearbejde("");
        navigate("/jobs");
    };

    return (
        <section className={style.searchSection}>
            <h2>Søg frivilligt arbejde:</h2>
            <form onSubmit={handleSearchSubmit} className={style.searchForm}>
                <div className={style.searchBarRow}>
                    <div className={style.inputWrapper}>
                        <img src="/icons/icons8-search-50.png" alt="Søg" className={style.searchIcon} />
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
                        <option value="">Arbejdstid</option>
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
                    <button type="button" onClick={handleReset} className={style.resetBtn}>Nulstil</button>
                </div>
            </form>
        </section>
    );
}