import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let books = [
  {
    isbn: "978-3-16-148410-0",
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    isBorrowed: false,
  },
  {
    isbn: "978-1-56619-909-4",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isBorrowed: true,
  },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.json(newBook);
});

app.put("/books/:isbn", (req, res) => {
  const { isbn } = req.params;
  const updatedBook = req.body;
  console.log(`Updating book with ISBN: ${isbn}`, updatedBook); // Лог

  books = books.map((book) =>
    book.isbn === isbn ? { ...book, ...updatedBook } : book
  );

  res.json(updatedBook);
});

app.delete("/books/:isbn", (req, res) => {
  const { isbn } = req.params;

  books = books.filter((book) => book.isbn !== isbn);

  res.send();
});

app.patch("/books/:isbn/borrow", (req, res) => {
  const { isbn } = req.params;
  const { isBorrowed } = req.body;

  const book = books.find((b) => b.isbn === isbn);
  if (book) {
    book.isBorrowed = isBorrowed;
    res.json(book);
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});

app.get("/books/search", (req, res) => {
  const { query } = req.query;
  const searchBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.isbn.includes(query)
  );
  res.json(searchBooks);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
