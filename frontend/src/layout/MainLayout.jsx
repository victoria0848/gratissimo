import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation/Navigation";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

export function MainLayout() {
    return (
        <>
            <Navigation /> 
            <Header />  
            <main>
                <Outlet /> 
            </main>
            <Footer />   
        </>
    );
}