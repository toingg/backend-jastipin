// Repository buat komuinikasi dengan database
// Boleh pake ORM, boleh raw query
// Biar apa? Biar kalo mau ganti2 ORM tinggal edit di file ini aja

const prisma = require("../config/db");

const insertUser = async (userData) => {
  try {
    const existUser = await prisma.users.findFirst({
      where: {
        email: userData.userEmail,
      },
    });

    if (existUser) {
      throw new Error("Email already exists!");
    }

    const user = await prisma.users.create({
      data: {
        user_id: userData.userId,
        name: userData.userName,
        email: userData.userEmail,
        password: userData.userPassword,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { insertUser };
