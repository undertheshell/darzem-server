const { pool } = require("../../config");

const postAuthor = async (req, res) => {
    try {
        const { authorName } = req.body;

        await pool.query("INSERT INTO authors (author_id, name) VALUES ( gen_random_uuid (), $1);", [authorName]);
        return res.status(201).json("Автор добавлен");
    }
    catch (error){
        return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = postAuthor;