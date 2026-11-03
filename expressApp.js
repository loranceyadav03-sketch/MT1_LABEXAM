import express from 'express';

const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 350,
        category: "Fiction"
    },
    {
        id: 2,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        price: 400,
        category: "Finance"
    },
    {
        id: 3,
        title: "Clean Code",
        author: "Robert C. Martin",
        price: 550,
        category: "Programming"
    }
];

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
});

// POST new book
app.post('/books', (req, res) => {
    const { id, title, author, price, category } = req.body;

    if (id === undefined || !title || !author ||
        price === undefined || !category) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (books.some(b => b.id === Number(id))) {
        return res.status(400).json({ message: 'Book ID already exists' });
    }

    const newBook = { id: Number(id), title, author, price, category };

    books.push(newBook);

    res.status(201).json({
        message: 'Book added successfully',
        book: newBook
    });
});

// PUT update book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }

    Object.assign(book, req.body);

    res.json({
        message: 'Book updated successfully',
        book: book
    });
});

// DELETE book
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    books.splice(index, 1);

    res.json({ message: 'Book deleted successfully' });
});

// Start server
app.listen(4000, () => {
    console.log('Express Server running at http://localhost:4000');
});