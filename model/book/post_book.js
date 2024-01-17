const uuid = require("uuid");

const { pool } = require("../../config");

const postBook = async (req, res) => {
    try {
      const { 
        bookTitle, 
        bookTopic, 
        bookPublishingHouse, 
        bookYear, 
        bookGenre, 
        bookLanguage, 
        authorId, 
        userId
      } = req.body;

      const newBookUuid = uuid.v4();
  
      await pool.query("INSERT INTO books ( book_id, title, topic, publishing_house, year, genre, language) VALUES ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING *", [
        newBookUuid,
        bookTitle, 
        bookTopic, 
        bookPublishingHouse, 
        bookYear, 
        bookGenre, 
        bookLanguage
      ]);
  
      await pool.query("INSERT INTO authors_books (author_id, book_id) VALUES ($1, $2);", [ authorId, newBookUuid ]);

      const initialBookReview = null;
      const initialBookRating = null;

      await pool.query("INSERT INTO books_read (book_id, user_id, review, rating) VALUES ($1, $2, $3, $4);", [ newBookUuid, userId, initialBookReview, initialBookRating ]);
      return res.status(201).json("Книга добавлена");
    }
    catch (error){
      console.log(error)
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = postBook;