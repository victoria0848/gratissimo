import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContextProvider';
import { AuthHeader } from '../components/AuthHeader/AuthHeader';
import { JobCard } from '../components/JobCard/JobCard';
import { ProfileFavoritter } from './FavoritesProfile';
import style from './ProfilePage.module.scss';

export function ProfilePage() {
    const { authToken, user } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState("annoncer");
    
    // PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const { data: profileData } = useFetch("/users");
    const { data: listings, isLoading: jobsLoading } = useFetch("/job-listings");

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    if (!authToken || jobsLoading) {
        return (
            <main>
                <p>Log ind for at se din profil side</p>
            </main>
        );
    }

    // BASED ON USER ID
    const nuvaerendeBrugerId = user?.id || 1;
    const mineAnnoncer = listings?.filter(job => job.userId === 1) || [];

    // PAGINATION MATH
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(mineAnnoncer.length / itemsPerPage); i++) {
            pageNumbers.push(i);
    }

    const handleSletAnnonce = async (jobId) => {
        const bekræft = window.confirm(`Vil du slette din jobannonce #${jobId}?`);
        if (!bekræft || !authToken) return;

        try {
            const res = await fetch(`http://localhost:4000/api/job-listings/${jobId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${authToken}` }
            });
            if (res.ok) {
                alert("Annoncen blev slettet live!");
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className={style.profilePageWrapper}>
            
            {/* INFO-BOX */}
            <AuthHeader>
                <h1>Velkommen {user?.user?.firstname || user?.firstname}</h1>
                <p>
                    Rediger eller slet dine annoncer. Du kan også danne dig et overblik over de annoncer du har gemt som favorit, samt fjerne dem igen
                </p>
                <nav>
                    <NavLink to="/login">Log ud</NavLink>
                    <NavLink to="/rediger-profil">Rediger Profil</NavLink>
                </nav>
            </AuthHeader>

            {/* TOGGLE BUTTONS*/}
            <nav className={style.tabNav}>
                <button type="button" onClick={() => { setActiveTab("annoncer"); setCurrentPage(1); }}
                    className={activeTab === "annoncer" ? style.activeTabBtn : style.tabBtn}>
                    Mine annoncer
                </button>
                <button type="button" onClick={() => { setActiveTab("favoritter"); setCurrentPage(1); }}
                    className={activeTab === "annoncer" ? style.activeTabBtn : style.tabBtn}>
                    Mine favoritter
                </button>
            </nav>

            <section className={style.contentWrapper}>
                
                {/* MY JOBS PART*/}
                {activeTab === "annoncer" && (
                    <section>              
                        {mineAnnoncer.length > 0 ? (
                            mineAnnoncer.map(job => (
                                 <JobCard 
                                    key={job.id}
                                    id={job.id}
                                    title={job.title}
                                    company={job.organization || "Din forening"}
                                    location={job.city || "Ikke oplyst"}
                                    category="Frivillig"
                                    arbejdstid="Deltid"
                                    description={job.description}
                                    adresse={job.address}
                                    zipcode={job.zipcode}
                                    city={job.city}
                                    workHome="On-site"
                                    createdAt={job.createdAt}
                                    onGemFavorit={() => handleSletAnnonce(job.id)}
                                    isProfilePage={true}
                                    activeTab="annoncer"
                                />
                            ))
                        ) : (
                    <p>Du har ikke oprettet nogen annoncer endnu.</p>
                )}


                    {/* PAGINATION*/}
                    {pageNumbers.length > 1 && (
                    <nav className={style.paginationNav}>
                        <ul className={style.paginationList}>
                            {pageNumbers.map(number => (
                            <li key={number}>
                                    <button 
                                        type="button"
                                        onClick={() => setCurrentPage(number)}
                                        className={currentPage === number ? style.activePageBtn : style.pageBtn}
                                        >
                                        {number}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    )}
                    </section>
            )}
            {activeTab === "favoritter" && <ProfileFavoritter />}
            </section>
        </main>
    );
}