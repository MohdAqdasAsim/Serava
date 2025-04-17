import { Route, Routes } from "react-router-dom";
import { Home, PrivacyPolicy, TermsOfService } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
  );
};

export default App;
