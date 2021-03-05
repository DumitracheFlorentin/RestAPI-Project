const express = require("express");
const data = require("../booksJSON");

const router = express.Router();

// GET ALL THE BOOKS
router.get("/", (req, res) => {
  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// GET A SPECIFIC BOOK
router.get("/:id", (req, res) => {
  try {
    const findId = data.some((book) => book._id === parseInt(req.params.id));

    if (findId === true) {
      return res
        .status(200)
        .json(data.filter((book) => book._id === parseInt(req.params.id)));
    } else {
      return res.status(404).json({ msg: "The book does not exist!" });
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// UPDATE A SPECIFIC BOOK'S INFO
router.patch("/:id", (req, res) => {
  try {
    const findId = data.some((book) => book._id === parseInt(req.params.id));

    if (findId === true) {
      const updatedInfo = req.body;
      data.forEach((book) => {
        if (book._id === parseInt(req.params.id)) {
          book.title = updatedInfo.title ? updatedInfo.title : book.title;
          book.author = updatedInfo.author ? updatedInfo.author : book.author;
          book.price = updatedInfo.price ? updatedInfo.price : book.price;
        }
      });
      res.status(200).json(data);
    } else {
      return res.status(404).json({ msg: "The book does not exist!" });
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// POST A BOOK
router.post("/", (req, res) => {
  try {
    const newBook = {
      _id: req.body._id,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
    };

    if (newBook._id || newBook.title || newBook.author || newBook.price) {
      data.push(newBook);
      res.status(200).json({ msg: "The book was pushed into data!" });
    } else {
      res.status(400).json({ msg: "Complete all the fields!" });
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// DELETE A BOOK FROM DATA
router.delete("/:id", (req, res) => {
  try {
    const findId = data.some((book) => book._id === parseInt(req.params.id));

    if (findId === true) {
      let deleteId = parseInt(req.params._id);
      let deleteObj = data.find((book) => book.id === deleteId);
      let deleteIndex = data.indexOf(deleteObj);
      data.splice(deleteIndex, 1);
      res.status(200).json(data);
    } else {
      return res.status(404).json({ msg: "The book does not exist!" });
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

module.exports = router;
