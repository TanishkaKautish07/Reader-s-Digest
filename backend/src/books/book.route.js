const express = require("express");
const Book = require("./book.model");
const {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
  contactUs,
} = require("./book.controller");
const verifyAdminToken = require("../middleware/verifyAdminToken");
const { upload } = require("../middleware/multer");
const router = express.Router();

// frontend => backend server => controller => book schema  => database => send to server => back to the frontend
//post = when submit something fronted to db
// get =  when get something back from db
// put/patch = when edit or update something
// delete = when delete something

// post a book
router.post(
  "/create-book",
  verifyAdminToken,
  upload.fields([
    {
      name: "pdf",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  postABook
);

// get all books
router.get("/", getAllBooks);

// single book endpoint
router.get("/:id", getSingleBook);

// update a book endpoint
router.put("/edit/:id", verifyAdminToken, UpdateBook);

router.delete("/:id", verifyAdminToken, deleteABook);
router.post("/contact-us", contactUs);

module.exports = router;
