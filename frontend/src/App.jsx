import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Frontpage } from "./pages/Frontpage";
import { SearchResultPage } from "./pages/SearchResultPage";
import { CreateAnnoncePage } from "./pages/CreateAnnoncePage";
import { NewsPage } from "./pages/NewsPage";
import { Loginpage } from "./pages/Loginpage";
import { CreateProfilePage } from "./pages/CreateProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout */}
        <Route element={<MainLayout />}>
          <Route index element={<Frontpage />} />
          <Route path="/jobs" element={<SearchResultPage />} />
          <Route path="/opret" element={<CreateAnnoncePage />} />
          <Route path="/nyheder" element={<NewsPage />} />
          <Route path="/registrer" element={<CreateProfilePage />} />
          <Route path="/login" element={<Loginpage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}