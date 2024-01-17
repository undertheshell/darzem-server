const { pool } = require("../../config");

const migrate = async () =>  {
  try {  
    await pool.query("ALTER TABLE authors ADD COLUMN years_of_life varchar;");
    await pool.query("UPDATE authors SET years_of_life = \'годы жизни не указаны\' WHERE years_of_life is null");
  }
  catch (error){
    console.log(error);
  }
}

migrate();