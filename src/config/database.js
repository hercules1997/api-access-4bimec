module.exports = {
  dialect: "postgres",
  // baseURL:
  //   "postgresql://postgres:tLvSwBPCrs2Zunmxghaz@containers-us-west-100.railway.app:8028/railway",
   host: "localhost",
   username: "postgres",
   password: "pandora",
   database: "bd-acesso",
  define: {
    timespamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
