import { useState, useEffect } from "react";
import axios from "axios";
import BookList from "../BookList/BookList";
import AddBook from "../AddBook/AddBook";
import SearchBar from "../SearchBar/SearchBar";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:4000/books");
    setBooks(response.data);
  };

  const addBook = async (newBook) => {
    await axios.post("http://localhost:4000/books", newBook);
    fetchBooks();
  };

  const updateBook = async (isbn, updatedBook) => {
    try {
      await axios.put(`http://localhost:4000/books/${isbn}`, updatedBook);
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const markAsBorrowed = async (isbn, updatedBook) => {
    try {
      await axios.put(`http://localhost:4000/books/${isbn}`, updatedBook);
      fetchBooks();
    } catch (error) {
      console.error("Error toggling borrow status:", error);
    }
  };

  const deleteBook = async (isbn) => {
    await axios.delete(`http://localhost:4000/books/${isbn}`);
    fetchBooks();
  };

  const searchBooks = async (query) => {
    const response = await axios.get(
      `http://localhost:4000/books/search?query=${query}`
    );
    setBooks(response.data);
  };

  return (
    <div>
      <h1>library of books</h1>
      <SearchBar onSearch={searchBooks} />
      <AddBook onAddBook={addBook} />
      <BookList
        books={books}
        onDelete={deleteBook}
        onUpdate={updateBook}
        onMarkAsBorrowed={markAsBorrowed}
      />
    </div>
  );
}

export default App;
