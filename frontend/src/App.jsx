import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import Home from "./pages/Home.jsx";
import Predict from "./pages/Predict.jsx";

export default function App() {
  return (
    <>
      <TopBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
        </Routes>
      </main>
    </>
  );
}
