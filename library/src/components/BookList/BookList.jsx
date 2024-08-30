import { useState } from "react";
import css from "./Booklist.module.css";

function BookList({ books, onDelete, onUpdate, onMarkAsBorrowed }) {
  const [editingIsbn, setEditingIsbn] = useState(null);
  const [editedBook, setEditedBook] = useState({
    isbn: "",
    title: "",
    author: "",
  });

  const startEditing = (book) => {
    setEditingIsbn(book.isbn);
    setEditedBook(book);
  };

  const cancelEditing = () => {
    setEditingIsbn(null);
    setEditedBook({ isbn: "", title: "", author: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const saveChanges = () => {
    onUpdate(editingIsbn, editedBook);
    cancelEditing();
  };

  return (
    <div>
      <h2>Book List</h2>
      <ul className={css.ul}>
        {books.map((book) => (
          <li key={book.isbn}>
            {editingIsbn === book.isbn ? (
              <div>
                <input
                  className={css.input}
                  type="text"
                  name="title"
                  value={editedBook.title}
                  onChange={handleInputChange}
                />
                <input
                  className={css.input}
                  type="text"
                  name="author"
                  value={editedBook.author}
                  onChange={handleInputChange}
                />
                <button className={css.btn} onClick={saveChanges}>
                  Save
                </button>
                <button className={css.btn} onClick={cancelEditing}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className={css.books}>
                <strong>{book.title}</strong> by {book.author} (ISBN:{" "}
                {book.isbn})
                <button className={css.btn} onClick={() => onDelete(book.isbn)}>
                  Delete
                </button>
                <button
                  className={css.btn}
                  onClick={() =>
                    onMarkAsBorrowed(book.isbn, {
                      isBorrowed: !book.isBorrowed,
                    })
                  }
                >
                  {book.isBorrowed ? "Return" : "Borrow"}
                </button>
                <button className={css.btn} onClick={() => startEditing(book)}>
                  Edit
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
