const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { pool, jwtSecret } = require("../../config");

const login = async (req, res) => {
    try {
      const { email, password} = req.body;
      const rawCandidate = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  
      if (!rawCandidate.rows[0]) return res.status(400).json("Такого пользователя не существует")
  
      const user = rawCandidate.rows[0];
  
      const passwordsMatch = await bcrypt.compare(password, user.password)
  
      if(!passwordsMatch) return res.status(400).json("Неверный пароль")
      
      const token = jwt.sign(
        { userId: user.id },
        jwtSecret,
        {expiresIn: "1d"}
        );
  
      return res.status(201).json({ token, userId: user.id, userName: user.name });
    }
    catch (error){
      console.log(error)
      return res.status(500).json("Что-то пошло не так");
    }
}

module.exports = login;