import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

export function NewsPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { data: allArticles, isLoading, error } = useFetch("/articles");

    // STATES
    const [selectedArticle, setSelectedArticle] = useState(null);

    const searchParams = new URLSearchParams(location.search);
    const articleIdFromUrl = searchParams.get('id');

    useEffect(() => {
        if (!allArticles || allArticles.length === 0) return;

        if (articleIdFromUrl) {
            //CHOSEN
            const found = allArticles.find(item => item.id === parseInt(articleIdFromUrl));
            if (found) setSelectedArticle(found);
        } else {
            //NOT CHOSEN
            const randomIndex = Math.floor(Math.random() * allArticles.length);
            setSelectedArticle(allArticles[randomIndex]);
        }
    }, [allArticles, articleIdFromUrl]);
    
    //SCROLL TO TOP
    const handleArticleClick = (id) => {
        navigate(`/nyheder?id=${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) return <p>Indlæser nyheder...</p>;
    if (error) return <p>Fejl ved indlæsning: {error}</p>;
    if (!selectedArticle) return null;

    const formatertDato = selectedArticle.createdAt 
        ? selectedArticle.createdAt.substring(0, 10).split('-').reverse().join('/') 
        : "Ikke oplyst";

    return (
        <main>
            
            {/* BIG ARTICLE */}
            <article aria-label="Udvalgt hovednyhed">
                <header>
                    <h2>{selectedArticle.title}</h2>
                    <p>Skrevet af: <strong>{selectedArticle.author || "Redaktionen"}</strong> | Dato: {formatertDato}</p>
                </header>

                <figure>
                    <img src={`http://localhost:4000${selectedArticle.imageUrl}`} alt={selectedArticle.title} />
                </figure>

                <section>
                    <p>{selectedArticle.content}</p>
                </section>
            </article>

            {/* NEWS */}
            <section aria-label="Nyhedsarkiv">
                <h3>Alle Nyheder</h3>
                
                <ul>
                    {allArticles?.map(item => (
                        <li key={item.id}>
                            <article 
                                onClick={() => handleArticleClick(item.id)}
                                style={{ cursor: 'pointer' }} 
                                role="button"
                                tabIndex={0}
                                aria-label={`Læs nyheden: ${item.title}`}
                            >
                                <figure>
                                    <img src={`http://localhost:4000${item.imageUrl}`} alt={item.title} width="150" />
                                </figure>
                                <section>
                                    <span>Af: {item.author || "Redaktionen"}</span>
                                    <h4>{item.title}</h4>
                                    <p>{item.teaser || item.content?.substring(0, 70)}...</p>
                                </section>
                            </article>
                        </li>
                    ))}
                </ul>
            </section>

        </main>
    );
}