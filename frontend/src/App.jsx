import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Frontpage } from "./pages/Frontpage";
import { NewsPage } from "./pages/NewsPage";
import { SearchResultPage } from "./pages/SearchResultPage";
import { CreateAnnoncePage } from "./pages/CreateAnnoncePage";
import { CreateProfilePage } from "./pages/CreateProfilePage";
import { LoginPage } from "./pages/LoginPage";
import { AuthcontextProvider } from "./context/AuthContextProvider";
import { CookiesProvider } from "react-cookie";

export default function App() {
  return (
    <CookiesProvider>
    <AuthcontextProvider>
    <BrowserRouter>
      <Routes>
        {/* MainLayout */}
        <Route element={<MainLayout />}>
          <Route index element={<Frontpage />} />
          <Route path="/nyheder" element={<NewsPage />} />
          <Route path="/jobs" element={<SearchResultPage />} />
          <Route path="/opret" element={<CreateAnnoncePage />} />
          <Route path="/registrer" element={<CreateProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthcontextProvider>
    </CookiesProvider>
  );
}