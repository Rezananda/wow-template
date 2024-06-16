import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { FavoritesProvider } from "./Context/FavoritesProvider";
import { ScrollProvider } from "./Context/ScrollProvider";
import Favorite from "./Pages/Favorite/Favorite";
import Home from "./Pages/Home/Home";
import PrivacyPolicy from "./Pages/Legal/PrivacyPolicy";
import TermsAndCondition from "./Pages/Legal/TermsAndCondition";
import NotFound from "./Pages/NotFound/NotFound";
import AllTemplate from "./Pages/Template/AllTemplate";
import DetailTemplate from "./Pages/Template/DetailTemplate";
import AllVideo from "./Pages/Video/AllVideo";

function App() {
  return (
    <>
      <FavoritesProvider>
        <ScrollProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/template" element={<DetailTemplate />} />
              <Route path="/all-template" element={<AllTemplate />} />
              <Route path="/all-video" element={<AllVideo />} />
              <Route path="/favorite" element={<Favorite />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndCondition />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ScrollProvider>
      </FavoritesProvider>
    </>
  );
}

export default App;
