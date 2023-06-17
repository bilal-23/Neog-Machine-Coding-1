import { useEffect } from "react";
import { Link } from "react-router-dom";
import Category from "./category";
import { useBooksStore } from "../store/books-store";

const Home = () => {
  const { setSearchTerm } = useBooksStore();

  useEffect(() => {
    setSearchTerm("");
  }, []);
  return (
    <>
      <header>
        <Link to={"/search"}>Search</Link>
      </header>
      <main className="main">
        <Category shelf="currentlyReading" heading="Currently Reading" />
        <Category shelf="wantToRead" heading="Wants to Read" />
        <Category shelf="read" heading="Read" />
      </main>
    </>
  );
};

export default Home;
