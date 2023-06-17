import "./App.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router";
import Search from "./components/search";
import { useEffect } from "react";
import { useBooksStore } from "./store/books-store";
import { books } from "./data";

function App() {
  const { setBooks } = useBooksStore();

  useEffect(() => {
    setBooks(books);
  }, []);

  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
