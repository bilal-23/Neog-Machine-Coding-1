import { create } from "zustand";
import { book } from "../types/books";


interface booksStore {
    books: book[],
    setBooks: (books: book[]) => void,
    searchTerm: string,
    setSearchTerm: (searchTerm: string) => void,
    searchResult: book[],
    setSearchResult: (searchResult: book[]) => void,
    changeShelf: (bookId: string, shelf: book["shelf"]) => void,
}

export const useBooksStore = create<booksStore>((set, get) => ({
    books: [],
    setBooks: (books: book[]) => set({ books }),
    searchTerm: "",
    searchResult: [],
    setSearchResult: (searchResult: book[]) => set({ searchResult }),
    setSearchTerm: (searchTerm: string) => {
        const books = get().books
        set({ searchTerm });
        if (searchTerm === "") {
            return set({ searchResult: [] });
        }
        const result = books.filter((book) => book.name.toLowerCase().includes(searchTerm.toLowerCase()));

        set({ searchResult: [...result] });
    },
    changeShelf: (bookId: string, shelf: book["shelf"]) => {
        const books = get().books;
        const bookIndex = books.findIndex((book) => book.id === bookId);
        books[bookIndex] = { ...books[bookIndex], shelf };
        set({ books: [...books] });

        const searchResult = get().searchResult;
        const searchResultIndex = searchResult.findIndex((book) => book.id === bookId);
        searchResult[searchResultIndex] = { ...searchResult[searchResultIndex], shelf };
        set({ searchResult: [...searchResult] });
    }
}));