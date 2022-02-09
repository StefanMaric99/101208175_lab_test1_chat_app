const mongoose = require("mongoose");

// const db = "mongodb://localhost:27017/chat";
const db = `mongodb+srv://${"stefan"}:${"SeriesXupgrade12$"}@cluster0.83wye.mongodb.net/${"chat"}`;

module.exports.dbConnect = async() => {
  return await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}