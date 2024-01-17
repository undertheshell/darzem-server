const { pool } = require("../../config");

const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {  
      await pool.query("DELETE FROM books_read WHERE book_id = $1;", [id]);
      await pool.query("DELETE FROM books WHERE book_id = $1;", [id]);
      await pool.query("DELETE FROM authors_books WHERE book_id = $1;", [id]);

      return res.status(201).json("Книга удалена");
    }
    catch (error){
      return res.status(500).json(error);
    }
}

module.exports = deleteBook;