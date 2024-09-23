// Service layer = bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const { insertUser, validateUser } = require("./auth.repository");

const registerUser = async (userData) => {
  id = uuidv4();

  const newUserData = {
    id: id,
    name: userData.name,
    email: userData.email,
    password: userData.password,
  };

  try {
    const user = await insertUser(newUserData);

    return user;
  } catch (error) {
    // Log error for debugging (optional)
    // console.error("Error in registerUser:", error);
    throw error;
  }
};

const loginUser = async (userData) => {
  try {
    const user = await validateUser(userData);

    const secret = process.env.JWT_SECRET;
    console.log(secret)
    const expiresIn = 60 * 60 * 24; // 1 Hour expire

    const payload = {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

    const data = {
      user,
      token,
    };
    return data;
  } catch (error) {
    throw error;
  }
};
module.exports = { registerUser, loginUser };
