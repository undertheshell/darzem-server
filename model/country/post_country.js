const { pool } = require("../../config");

const postCountry = async (req, res) => {
    try {
      const { countryName } = req.body;
  
      await pool.query("INSERT INTO countries (country_id, name) VALUES ( gen_random_uuid (), $1);", [countryName]);
      return res.status(201).json("Страна добавлена");
    }
    catch (error){
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = postCountry;