const { pool } = require("../../config");

const postAuthor = async (req, res) => {
    try {
        const { authorName, years } = req.body;

        await pool.query("INSERT INTO authors (author_id, name, years_of_life) VALUES ( gen_random_uuid (), $1, $2);", [authorName, years]);
        return res.status(201).json("Автор добавлен");
    }
    catch (error){
        return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = postAuthor;