import React from "react";
import Book from "./book";
import { useBooksStore } from "../store/books-store";

interface Props {
  shelf: "currentlyReading" | "wantToRead" | "read";
  heading: string;
}
const Category: React.FC<Props> = ({ heading, shelf }) => {
  const { books } = useBooksStore();

  return (
    <div className="category-container">
      <p className="category-heading">{heading}</p>
      <div className="books-container">
        {books.map((book) => {
          if (book.shelf !== shelf) return null;
          if (book.shelf === "currentlyReading") {
            // console.log(book);
          }

          return (
            <Book
              id={book.id}
              name={book.name}
              author={book.author}
              image={book.image}
              shelf={book.shelf}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
