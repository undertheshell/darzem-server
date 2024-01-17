const { pool } = require("../../config");

const putBook= async (req, res) => {
    try {  
        const {
            title,
            topic, 
            publishing_house,
            year,
            genre,
            language,
            author_id,
            book_id 
        } = req.body;

        await pool.query(`
        UPDATE books 
        SET 
            title = $1, 
            topic = $2, 
            publishing_house = $3, 
            year = $4, 
            genre = $5, 
            language = $6
        WHERE book_id = $7;
        `, [title, topic, publishing_house, year, genre, language, book_id]);
        
        await pool.query(`UPDATE authors_books SET author_id = $1 WHERE book_id = $2;`, [author_id, book_id]);
        return res.status(202).json("Данные о книге обновлены");
    }
    catch (error){
      return res.status(500).json(error);
    }
}

module.exports = putBook;