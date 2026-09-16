import React, { useState } from 'react'; 
import { useLocation } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { SearchBar } from '../components/SearchBar/SearchBar'; 
import { JobCard } from '../components/JobCard/JobCard';
import style from './SearchResultPage.module.scss';

export function SearchResultPage() {
    const location = useLocation();

    // API DATA
     const { data: listings, isLoading, error } = useFetch("/job-listings");

    // PAGINATION STATE
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 4; 

    const searchParams = new URLSearchParams(location.search);
    const querySearch = searchParams.get('search')?.toLowerCase() || "";
    const queryGeo = searchParams.get('geo') || "";
    const queryCat = searchParams.get('cat') || "";
    const queryTid = searchParams.get('tid') || "";
    const queryType = searchParams.get('type') || "";

    const filteredJobs = listings?.filter(job => {
        return (
            (!querySearch || job.title?.toLowerCase().includes(querySearch) || job.description?.toLowerCase().includes(querySearch)) &&
            (!queryGeo || job.region?.name === queryGeo) &&
            (!queryCat || job.jobCategoryId === parseInt(queryCat)) &&
            (!queryTid || job.workType?.type === queryTid) &&
            (!queryType || job.workHome === queryType)
        );
    }) || [];

    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;

    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredJobs.length / jobsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleGemFavorit = (jobId) => {
        alert(`Log ind påkrævet: Du skal være logget ind med dit Bearer Token for at gemme jobannonce #${jobId} i dine favoritter. ⭐`);
    };

    if (isLoading) return <div className={style.centerMsg}><p>Henter jobannoncer... ⏳</p></div>;
    if (error) return <div className={style.centerMsg}><p>Fejl ved indlæsning: {error}</p></div>;

    return (
        <main className={style.searchPageWrapper}>

        {/* SEARCH WORK*/}
        <SearchBar />   
           
        {/* JOBCARDS*/}
             <section className={style.listContainer} aria-label="Søgeresultater">
                <p className={style.resultCount}>Viser {filteredJobs.length} ledige stillinger</p>
                
                {filteredJobs.length > 0 ? (
                    currentJobs.map(job => (
                        <JobCard 
                            key={job.id}
                            id={job.id}
                            title={job.title}
                            company={job.organization}
                            location={job.region?.name || "Ikke oplyst"}
                            category={job.jobCategory?.name || "Undervisning"}
                            arbejdstid={job.workType?.type || "Deltid"}
                            description={job.description}
                            adresse={job.address}
                            zipcode={job.zipcode}
                            city={job.city}
                            workHome={job.workHome}
                            createdAt={job.createdAt}
                            onGemFavorit={handleGemFavorit}
                        />
                    ))
                ) : (
                    <div className={style.noResults}>
                        <p>Ingen jobs matchede din filtrering. Prøv at ændre dine kriterier i menuen ovenfor.</p>
                    </div>
                )}

                {pageNumbers.length > 1 && (
                    <nav className={style.paginationNav} aria-label="Side-navigation">
                        <ul className={style.paginationList}>
                            {pageNumbers.map(number => (
                            <li key={number}>
                                    <button 
                                        type="button"
                                        onClick={() => setCurrentPage(number)} // 🌟 Slettet scrollTo, så den bare skifter side helt simpelt!
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

        </main>
    );
}