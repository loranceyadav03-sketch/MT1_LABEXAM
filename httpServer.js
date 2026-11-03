import http from 'http';
import fs from 'fs';

let books = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 350 }
];

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Welcome to Library Management</h1>');
    }

    else if (req.method === 'GET' && req.url === '/books') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(books));
    }

    else if (req.method === 'GET' && req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Library Management Application</h1>');
    }

    else if (req.method === 'GET' && req.url === '/home') {
        fs.readFile('./public/index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('File reading error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }

    else if (req.method === 'POST' && req.url === '/add-book') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const book = JSON.parse(body);

                if (!book.id || !book.title || !book.author ||
                    book.price === undefined || book.price === null) {
                    res.writeHead(400);
                    return res.end('All book details are required');
                }

                books.push(book);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: 'Book added successfully',
                    book: book
                }));
            } catch {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Page Not Found');
    }
});

server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});