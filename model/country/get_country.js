const { pool } = require("../../config");

const getCountries = async (_, res) => {
    try {  
      const countries = await pool.query("SELECT * FROM countries;");
      return res.status(201).json(countries.rows);
    }
    catch (error){
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = getCountries;