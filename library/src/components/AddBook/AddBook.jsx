import { useState } from "react";
import css from "./AddBook.module.css";

function AddBook({ onAddBook }) {
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    author: "",
    isBorrowed: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook(book);
    setBook({ isbn: "", title: "", author: "", isBorrowed: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Book</h2>
      <input
        className={css.input}
        type="text"
        placeholder="ISBN"
        value={book.isbn}
        onChange={(e) => setBook({ ...book, isbn: e.target.value })}
        required
      />
      <input
        className={css.input}
        type="text"
        placeholder="Title"
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
        required
      />
      <input
        className={css.input}
        type="text"
        placeholder="Author"
        value={book.author}
        onChange={(e) => setBook({ ...book, author: e.target.value })}
        required
      />
      <button className={css.btn} type="submit">
        Add Book
      </button>
    </form>
  );
}

export default AddBook;
