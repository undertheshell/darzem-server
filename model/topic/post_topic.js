const { pool } = require("../../config");

const postTopic = async (req, res) => {
  try {
    const { topicName } = req.body;

    await pool.query("INSERT INTO topics (topic_id, topic_name) VALUES ( gen_random_uuid (), $1);", [topicName]);
    return res.status(201).json("Тема добавлена");
  }
  catch (error){
    return res.status(500).json("Что-то пошло не так");
  }
}

module.exports = postTopic;