import React, { useState, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContextProvider';
import { AuthHeader } from '../components/AuthHeader/AuthHeader';
import style from './LoginPage.module.scss'; 

export function CreateJobPage() {
    const { authToken } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const { data: categories } = useFetch("/job-categories");
    const { data: regions } = useFetch("/regions");
    const { data: workTypes } = useFetch("/workTypes"); 

    const handleCreateJob = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!authToken) {
            setMessage("Fejl: Du skal være logget ind for at oprette en annonce.");
            return;
        }

        const bodyData = {
            title: e.target.title.value,
            organization: e.target.organization.value,
            regionId: parseInt(e.target.region.value), 
            jobCategoryId: parseInt(e.target.category.value),
            workTypeId: parseInt(e.target.workType.value),
            address: e.target.address.value,
            zipcode: e.target.zipcode.value,
            city: e.target.city.value,
            description: e.target.description.value,
            workHome: "On-site" 
        };

        try {
            const res = await fetch("http://localhost:4000/api/job-listings", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}` 
                },
                body: JSON.stringify(bodyData)
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Annoncen blev oprettet live i databasen!");
                setTimeout(() => navigate("/jobs"), 2000);
            } else {
                setMessage(`Fejl: ${data.message}`);
            }
        } catch (err) {
            setMessage("Kunne ikke oprette forbindelse til serveren.");
        }
    };

    return (
        <main className="container">
            
            <AuthHeader>
                <h1>Opret en annonce og find frivillige til din forening</h1>
                <p>
                    Gratissimo er gratis for alle. Frivillige, organisationer og foreninger. Du skaber det
                    frivillige job og vi formidler kontakten. Når du har fundet en frivillig til din forening,
                    kan du blot fjerne annoncen igen ved at gå til din side.
                </p>
                <NavLink to="/profil" className={style.toggleLink}>Gå til min side</NavLink>
            </AuthHeader>

            {/* FORM*/}
            <section className={style.formWrapper} style={{ maxWidth: "700px" }}>
                <form onSubmit={handleCreateJob} className={style.authForm}>
                    
                    <label>
                        Overskrift
                        <input type="text" name="title" placeholder="Eks. Mågejær søges" required />
                    </label>

                    <label >
                        Organisation / forening
                        <input type="text" name="organization" placeholder="Skriv din forening her..." required />
                    </label>

                    <label>
                        Lokation
                        <input type="text" name="organization" placeholder="Vælg lokation..." required />
                        <select name="region" required>
                            <option value="">Vælg region</option>
                            {regions?.map(reg => (
                                <option key={reg.id} value={reg.id}>{reg.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Kategori
                        <input type="text" name="organization" placeholder="Vælg kategori..." required />
                        <select name="category" required>
                            <option value="">Vælg kategori</option>
                            {categories?.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Arbejdstid
                        <input type="text" name="organization" placeholder="Vælg arbejdstid..." required />
                        <select name="workType" required>
                            <option value="">Vælg arbejdstid</option>
                            {workTypes?.map(type => (
                                <option key={type.id} value={type.id}>{type.type}</option>
                            )) || (
                                <>
                                    <option value="1">Deltid</option>
                                    <option value="2">Fuldtid</option>
                                    <option value="3">Flex</option>
                                </>
                            )}
                        </select>
                    </label>

                    <label>
                        Adresse
                        <input type="text" name="address" placeholder="Eks. Hornegade 22, 1. sal" required />
                    </label>

                    <label>
                        Postnummer
                        <input type="text" name="zipcode" placeholder="Eks.92000" required />
                    </label>

                    <label>
                        By
                        <input type="text" name="city" placeholder="Eks.Aalbrog SV" required />
                    </label>

                    <label>
                        Job beskrivelse
                        <textarea name="description" rows="10" placeholder="Her kan du beskrive jobbet, hvilke erfaringer der kræves og hvad der forventes af den frivillige..." required style={{ resize: "vertical", padding: "10px" }}></textarea>
                    </label>

                    <input type="submit" value="Opret annonce" className={style.submitBtn}/>
                </form>

                {message && <b className={style.feedbackMsg}>{message}</b>}
            </section>
        </main>
    );
}
