const { pool } = require("../../config");

const postLanguage = async (req, res) => {
    try {
      const { languageName } = req.body;
  
      await pool.query("INSERT INTO languages (language_id, name) VALUES ( gen_random_uuid (), $1);", [languageName]);
      return res.status(201).json("Язык добавлен");
    }
    catch (error){
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = postLanguage;