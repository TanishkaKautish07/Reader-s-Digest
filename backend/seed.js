const Book = require("./src/books/book.model");
const { config } = require("dotenv");
config();
const mongoose = require("mongoose");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("blog2.json", "utf-8"));
const main = async () => {
  await mongoose.connect(process.env.DB_URL);
  await Book.deleteMany({});
  console.log("done");
  await Book.insertMany(data);
  console.log("successfully seeded");
};

main();
