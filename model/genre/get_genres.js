const { pool } = require("../../config");

const getGenres = async (_, res) => {
    try {  
      const genres = await pool.query("SELECT * FROM genres;");
      return res.status(201).json(genres.rows);
    }
    catch (error){
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = getGenres;