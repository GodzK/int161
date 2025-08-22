const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getSubject);       // GET /users
router.get("/:id", userController.getSubjectById); // GET /users/:id
router.post("/", userController.createSubject);    // POST /users

module.exports = router;
