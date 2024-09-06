// Service layer = bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable
const { v4: uuidv4 } = require("uuid");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { insertUser } = require("./auth.repository");

const registerUser = async (userData) => {
  id = uuidv4();

  const hashedPassword = await bcrpyt.hash(userData.password, 10);

  const newUserData = {
    userId: id,
    userName: userData.name,
    userEmail: userData.email,
    userPassword: hashedPassword,
  };

  try {
    const user = await insertUser(newUserData);

    return user;
  } catch (error) {
    // Log error for debugging (optional)
    // console.error("Error in createUser:", error);
    throw error;
  }
};

// const validateUser = async (userData) => {
//   const user = await
// }

module.exports = { registerUser };
