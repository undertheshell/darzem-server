const { pool } = require("../../config");

const postPublishingHouse = async (req, res) => {
    try {
      const { publishingHouseName, publishingHouseCity, publishingHouseCountry, publishingHouseEmail } = req.body;

      await pool.query("INSERT INTO publishing_houses (publishing_house_id, city, name, country, email) VALUES (gen_random_uuid (),$1, $2, $3, $4);", 
        [
          publishingHouseCity,
          publishingHouseName,
          publishingHouseCountry,
          publishingHouseEmail
        ]);
      return res.status(201).json("Издательство добавлено");
    }
    catch (error){
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = postPublishingHouse;