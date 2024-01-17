const { pool } = require("../../config");

const getPublishingHouses = async (_, res) => {
    try {  
      const publishingHouses = await pool.query(`SELECT 
            publishing_house_id AS id, 
            city, 
            publishing_houses.name AS name, 
            email, 
            countries.name AS country 
        FROM publishing_houses 
        JOIN countries ON countries.country_id = publishing_houses.country;`);
      return res.status(201).json(publishingHouses.rows);
    }
    catch (error){
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = getPublishingHouses;