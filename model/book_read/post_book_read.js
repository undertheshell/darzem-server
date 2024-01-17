const { pool } = require("../../config");

const postBookRead = async (req, res) => {
    try {
      const { bookId, userId, review, rating } = req.body;
  
      await pool.query("INSERT INTO books_read (book_id, user_id, review, rating) VALUES ($1, $2, $3, $4);", 
        [bookId, userId, review, rating]);
      return res.status(201).json("Книга помечена как прочитанная");
    }
    catch (error){
      console.log(error);
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = postBookRead;