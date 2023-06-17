import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useBooksStore } from "../store/books-store";
import { Link } from "react-router-dom";
import Book from "./book";

const Search = () => {
  const { searchTerm, setSearchTerm, searchResult } = useBooksStore();

  return (
    <>
      <header className="search-header">
        <Link to="/">
          <ArrowBackIosIcon sx={{ color: "#fff" }} />
        </Link>
        <input
          type="search"
          placeholder="Search your books"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </header>
      <div className={"books-container"}>
        {searchResult.map((book) => {
          return (
            <Book
              key={book.id}
              id={book.id}
              name={book.name}
              image={book.image}
              shelf={book.shelf}
              author={book.author}
            />
          );
        })}
      </div>
      <div className="search-info">
        {searchResult.length === 0 && searchTerm === "" && (
          <p
            style={{
              fontSize: "1.5rem",
              color: "#fff",
            }}
          >
            Type to search
          </p>
        )}
        {searchResult.length === 0 && searchTerm !== "" && (
          <p
            style={{
              fontSize: "1.5rem",
              color: "#fff",
            }}
          >
            No Results
          </p>
        )}
      </div>
    </>
  );
};

export default Search;
