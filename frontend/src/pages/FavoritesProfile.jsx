import React, { useState, useContext } from 'react';
import { useFetch } from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContextProvider';
import { JobCard } from '../components/JobCard/JobCard';

export function ProfileFavoritter() {
    const { authToken } = useContext(AuthContext);
    
    // PAGINATION STATES
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 

    const { data: favorites, isLoading, error } = useFetch("/favorites");

    if (isLoading) return <p>Henter dine favoritter...</p>;

    // PAGINATION MATH
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFavorites = favorites?.slice(indexOfFirstItem, indexOfLastItem) || [];
    
    const pageNumbers = [];
    if (favorites) {
        for (let i = 1; i <= Math.ceil(favorites.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
    }

    const handleFjernFavorit = async (favId) => {
        if (!authToken) return;
        try {
            const res = await fetch(`http://localhost:4000/api/favorites/${favId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${authToken}` }
            });
            if (res.ok) {
                alert("Favorit fjernet live!");
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section aria-label="Dine gemte favoritter">
            <h3>Mine favoritter ({favorites?.length || 0})</h3>
            
            {currentFavorites.length > 0 ? (
                currentFavorites.map(fav => (
                    <JobCard 
                        key={fav.id}
                        id={fav.jobListingId}
                        title={fav.jobListing?.title || "Frivillig medarbejder"}
                        company={fav.jobListing?.organization || "Gratissimo forening"}
                        location={fav.jobListing?.city || "Ikke oplyst"}
                        category="Frivillig"
                        arbejdstid="Deltid"
                        description={fav.jobListing?.description}
                        adresse={fav.jobListing?.address}
                        zipcode={fav.jobListing?.zipcode}
                        city={fav.jobListing?.city}
                        workHome="On-site"
                        createdAt={fav.jobListing?.createdAt}
                        onGemFavorit={() => handleFjernFavorit(fav.id)}
                        isProfilePage={true}
                        activeTab="favoritter"
                    />
                ))
            ) : (
                <p>Du har ikke gemt nogen favoritter endnu.</p>
            )}

            {/* PAGINATION */}
            {pageNumbers.length > 1 && (
                <nav className="paginationNav" aria-label="Side-navigation">
                    <ul className="paginationList" style={{ display: "flex", listStyle: "none", gap: "10px", padding: 0 }}>
                        {pageNumbers.map(number => (
                            <li key={number}>
                                <button 
                                    type="button"
                                    onClick={() => setCurrentPage(number)} 
                                    style={{ cursor: "pointer", fontWeight: currentPage === number ? "bold" : "normal" }}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </section>
    );
}