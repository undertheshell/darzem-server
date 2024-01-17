const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { pool, jwtSecret, encryptionSalt } = require("../../config");

const register = async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const candidate = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      
      if (candidate.rows[0]) return res.status(400).json("Такой пользователь уже существует")
      
      const hashedPassword = await bcrypt.hash(password, parseInt(encryptionSalt));
  
      const newUser = await pool.query("INSERT INTO users (id, name, email, password) VALUES (gen_random_uuid (), $1, $2, $3) RETURNING id, name, email", 
        [name, email, hashedPassword]);

        const token = jwt.sign(
          { userId: newUser.id },
          jwtSecret,
          {expiresIn: "1d"}
          );
    
        return res.status(201).json({ token, userId: newUser.rows[0].id, userName: newUser.rows[0].name });
    }
    catch (error){
      console.log(error)
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = register;