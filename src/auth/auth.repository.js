// Repository buat komuinikasi dengan database
// Boleh pake ORM, boleh raw query
// Biar apa? Biar kalo mau ganti2 ORM tinggal edit di file ini aja

const prisma = require("../config/db");
const bcrpyt = require("bcrypt");

const checkUserExist = async (userEmail) => {
  const existUser = await prisma.users.findFirst({
    where: {
      email: userEmail,
    },
  });

  return existUser;
  // Jadi existUser disini kalau ada akan mereturn dari 1 row data user itu dalam bentuk json (bisa dicoba dengan console.log(user) pada func validateUser / insertUser)
  // Jika tidak ada maka akan mereturn null
};

const insertUser = async (userData) => {
  try {
    const user = await checkUserExist(userData.email);

    // Check user value, buat check ada user ngga
    // console.log(user);

    if (user) {
      throw new Error("Email already exists!");
    }

    const hashedPassword = await bcrpyt.hash(userData.password, 10);

    const newUser = await prisma.users.create({
      data: {
        user_id: userData.id,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    // console.error("Error in insertUser:", error);

    throw error;
  }
};

const validateUser = async (userData) => {
  try {
    const user = await checkUserExist(userData.email);
    // console.log(user);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await bcrpyt.compare(
      userData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password !");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { insertUser, validateUser };
