import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"; // if it exists
import Home from "./pages/Home";
import Intro from "./pages/Intro";
import GuidesIndex from "./pages/GuidesIndex";
import GuideReader from "./pages/GuideReader";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Resources from "./pages/Resources"; // only if file exists!

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
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
