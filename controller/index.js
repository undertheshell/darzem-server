const express = require("express");
require('dotenv').config();

const app = express();
const cors = require("cors");

const postLanguage = require("../model/language/post_language");
const postGenre  = require("../model/genre/post_genre");
const postPublishingHouse = require("../model/publishing_house/post_publishing_house");
const postTopic = require("../model/topic/post_topic");
const postAuthor = require("../model/author/post_author");
const postBook = require("../model/book/post_book");
const postBookRead = require("../model/book_read/post_book_read");
const login = require("../model/auth/login");
const register = require("../model/auth/register");
const postCountry = require("../model/country/post_country");
const getLanguages = require("../model/language/get_laguages");
const getTopics = require("../model/topic/get_topics");
const getPublishingHouses = require("../model/publishing_house/get_publishing_houses");
const getGenres = require("../model/genre/get_genres");
const getCountries = require("../model/country/get_country");
const getBooksRead = require("../model/book_read/get_books_read");
const getBooks = require("../model/book/get_books");
const getAuthors = require("../model/author/get_authors");
const getBook = require("../model/book/get_book");
const deleteBook = require("../model/book/delete_book");
const { serverPort } = require("../config");
const putBook = require("../model/book/put_book");

app.use(cors());
app.use(express.json({extended: true})); //req.body

app.get('/book', (req, res) => getBooks(req, res));
app.get('/book/:id', (req, res) => getBook(req, res));
app.post('/book', (req, res) => postBook(req, res));
app.put('/book', (req, res) => putBook(req, res));
app.delete('/book/:id', (req, res) => deleteBook(req, res));

app.post('/register', (req, res) => register(req, res));
app.post('/login', (req, res)=> login(req, res));

app.get('/language', (req, res) => getLanguages(req, res));
app.post('/language', (req, res) => postLanguage(req, res));

app.get('/genre', (req, res) => getGenres(req, res));
app.post('/genre', (req, res) => postGenre(req, res));

app.get('/publishing-house', (req, res) => getPublishingHouses(req, res));
app.post('/publishing-house', (req, res) => postPublishingHouse(req, res));

app.get('/topic', (req, res) => getTopics(req, res));
app.post('/topic', (req, res) => postTopic(req, res));

app.get('/author', (req, res) => getAuthors(req, res));
app.post('/author', (req, res) => postAuthor(req, res));

app.get('/country', (req, res) => getCountries(req, res));
app.post('/country', (req, res) => postCountry(req, res));

app.get('/books-read/:id', (req, res) => getBooksRead(req, res));
app.post('/books-read', (req, res) => postBookRead(req, res));

app.listen(serverPort, () => { console.log("server has started on port 5000"); });
