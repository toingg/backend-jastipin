// Service layer = bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable

const { insertUser } = require("./auth.repository");
const createUser = async (userData) => {
  const user = await insertUser();

  return user;
};

module.exports = { createUser };
