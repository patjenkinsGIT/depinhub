import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import GuidesIndex from "./pages/GuidesIndex";
import GuideReader from "./pages/GuideReader";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/guides/:slug" element={<GuideReader />} />
          <Route path="/guides/" element={<GuidesIndex />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
