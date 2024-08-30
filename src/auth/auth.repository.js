// Repository buat komuinikasi dengan database
// Boleh pake ORM, boleh raw query
// Biar apa? Biar kalo mau ganti2 ORM tinggal edit di file ini aja

const prisma = require("../config/db");

const insertUser = async (userData) => {
  const user = await prisma.users.create({
    data: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
    },
  });

  return user;
};


module.exports = { insertUser };
