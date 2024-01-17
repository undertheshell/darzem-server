const { pool } = require("../../config");

const getTopics = async (_, res) => {
    try {  
      const topics = await pool.query("SELECT * FROM topics;");
      return res.status(201).json(topics.rows);
    }
    catch (error){
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = getTopics;