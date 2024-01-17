const { pool } = require("../../config");

const getBooksRead= async (req, res) => {
    const { id } = req.params;

    try {  
      const booksRead = await pool.query(`
        SELECT 
          books.book_id AS id,
          books.title,
          books.year,
          authors.name AS author_name,
          topics.topic_name AS topic,
          publishing_houses.city AS publishing_house_city,
          publishing_houses.name AS publishing_house_name,
          countries.name AS publishing_house_country,
          publishing_houses.email AS publishing_house_email,
          genres.name AS genre,
          languages.name AS language,
          books_read.review,
          books_read.rating
        FROM books
        JOIN books_read ON books_read.book_id = books.book_id
        JOIN users ON users.id = books_read.user_id
        JOIN topics ON topics.topic_id = books.topic
        JOIN publishing_houses ON publishing_houses.publishing_house_id = books.publishing_house
        JOIN countries ON countries.country_id = publishing_houses.country
        JOIN genres ON genres.genre_id = books.genre
        JOIN languages ON languages.language_id = books.language
        JOIN authors_books ON authors_books.book_id = books.book_id
        JOIN authors ON authors.author_id = authors_books.author_id
        WHERE users.id = $1;
    `, [id]);
      return res.status(201).json(booksRead.rows);
    }
    catch (error){
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = getBooksRead;