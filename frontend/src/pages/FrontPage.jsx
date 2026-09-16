import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { Slider } from '../components/Slider/Slider';
import style from './Frontpage.module.scss'; 

   export function Frontpage() {
    const { data: jobs } = useFetch("/job-listings");
    const { data: categories } = useFetch("/job-categories");
    const { data: news } = useFetch("/articles");

    function shuffleArray(dataArray) {
        if (!dataArray) return [];
        const shuffleData = [...dataArray].sort(() => Math.random() - 0.5);
        return shuffleData;
    }

    const randomNews = shuffleArray(news);

    const getJobCount = (catId) => {
        if (!jobs) return 0;
        return jobs.filter(job => job.jobCategoryId === catId).length;
    };

    const uniqueCategories = categories ? categories.filter((cat, index, self) =>
        index === self.findIndex((c) => c.id === cat.id)
    ) : [];

    return (
        <main className={style.frontpageWrapper}>
            {/* SEARCH WORK */}
            <SearchBar /> 

            {/* FIND JOB VED KATEGORI */}
            <section className={style.categorySection}>
                <h3>Find job ved kategori</h3>
                <div className={style.categoryGrid}>
                    {uniqueCategories.map(cat => (
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