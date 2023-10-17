import { useLayoutEffect } from "react";
import Navbar from "./components/Navbar";
import NotesList from "./pages/noteslist/NotesList";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/noteslist/Home";
function App() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "white";
  });
  return (
    <>
      <Navbar />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<NotesList />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
