const { pool } = require("../../config");

const postGenre = async (req, res) => {
    try {
      const { genreName } = req.body;
  
      await pool.query("INSERT INTO genres (genre_id, name) VALUES ( gen_random_uuid (), $1);", [genreName]);
      return res.status(201).json("Жанр добавлен");
    }
    catch (error){
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = postGenre;