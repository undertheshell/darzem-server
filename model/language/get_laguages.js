const { pool } = require("../../config");

const getLanguages = async (_, res) => {
    try {  
      const languages = await pool.query("SELECT * FROM languages;");
      return res.status(201).json(languages.rows);
    }
    catch (error){
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = getLanguages;