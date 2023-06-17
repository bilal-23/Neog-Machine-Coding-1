export interface book {
    id: string,
    name: string
    author: string,
    image:
    string,
    rating: number,
    shelf: "wantToRead" | "currentlyReading" | "read" | "none",
}