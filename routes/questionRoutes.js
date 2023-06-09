const express = require("express");

const { createQuestion, getQuestion, deleteQuestion } = require("../controllers/questionControllers");
const router = express.Router();

router.get("/", getQuestion);
router.post("/create", createQuestion);
router.delete("/delete/:id", deleteQuestion);

module.exports = router;