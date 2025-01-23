const Book = require("./book.model");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");
const { mailConfig } = require("../nodemailer/config");

const postABook = async (req, res) => {
  try {
    const pdfFile = req.files["pdf"] ? req.files["pdf"][0] : null;
    const coverImgFile = req.files["coverImage"]
      ? req.files["coverImage"][0]
      : null;
    let pdfLink = "";
    let coverImgLink = "";

    console.log(pdfFile);
    console.log(coverImgFile);

    if (pdfFile) {
      const resFile = await cloudinary.uploader.upload(pdfFile.path, {
        folder: "book",
        resource_type: "raw",
      });
      pdfLink = resFile.secure_url;
    }
    if (coverImgFile) {
      const resFile = await cloudinary.uploader.upload(coverImgFile.path, {
        folder: "coverimg",
      });
      coverImgLink = resFile.secure_url;
    }
    // res.send("done");
    const newBook = await Book({
      ...req.body,
      pdf: pdfLink,
      coverImage: coverImgLink,
    });
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book posted successfully", book: newBook });
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send({ message: "Failed to create book" });
  }
};

// get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    console.log(books);
    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({ message: "Failed to fetch books" });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send({ message: "Book not Found!" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching book", error);
    res.status(500).send({ message: "Failed to fetch book" });
  }
};

// update book data
const UpdateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating a book", error);
    res.status(500).send({ message: "Failed to update a book" });
  }
};

const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error("Error deleting a book", error);
    res.status(500).send({ message: "Failed to delete a book" });
  }
};

const contactUs = async (req, res) => {
  try {
    const contactBody = req.body;
    await mailConfig.sendMail({
      from: contactBody,
      to: "tanishkakautish@gmail.com",
      subject: "Query",
      html: `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Query Email Template</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4caf50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content p {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.5;
      color: #333333;
    }
    .footer {
      background-color: #f4f4f9;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #999999;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 20px;
      background-color: #4caf50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }
    .button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>New Query Received</h1>
    </div>
    <div class="content">
      <p><strong>Sender's Name:</strong> ${contactBody.name}</p>
      <p><strong>Sender's Email:</strong> ${contactBody.email}</p>
      <p><strong>Query:</strong></p>
      <p>${contactBody.message}</p>
      <a href="mailto:${contactBody.email}" class="button">Reply to Query</a>
    </div>
    <div class="footer">
      <p>Thank you for reaching out to us!</p>
    </div>
  </div>
</body>
</html>

      `,
    });
    res.status(200).json({
      message: "mail sent",
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to send mail",
      error: err,
    });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
  contactUs,
};
