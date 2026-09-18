import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Frontpage } from "./pages/Frontpage";
import { NewsPage } from "./pages/NewsPage";
import { SearchResultPage } from "./pages/SearchResultPage";
import { CreateJobPage } from './pages/CreateJobPage'; 
import { CreateProfilePage } from "./pages/CreateProfilePage";
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from "./pages/LoginPage";
import { AuthContextProvider } from "./context/AuthContextProvider"; 
import { CookiesProvider } from "react-cookie";

export default function App() {
  return (
    <CookiesProvider>
    <AuthContextProvider>
    <BrowserRouter>
      <Routes>

        {/* MAIN LAYOUT */}
        <Route element={<MainLayout />}>
          <Route index element={<Frontpage />} />
          <Route path="/nyheder" element={<NewsPage />} />
          <Route path="/jobs" element={<SearchResultPage />} />
          <Route path="/opret" element={<CreateJobPage />} />
          <Route path="/registrer" element={<CreateProfilePage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        </Routes>
    </BrowserRouter>
    </AuthContextProvider>
    </CookiesProvider>
  );
}