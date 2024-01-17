const { pool } = require("../../config");

const getAuthors = async (_, res) => {
    try {  
      const authors = await pool.query("SELECT * FROM authors;");
      return res.status(201).json(authors.rows);
    }
    catch (error){
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = getAuthors;