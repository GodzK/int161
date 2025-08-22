const userService = require("../services/userService");

exports.getSubject = async (req, res) => {
  try {
    const subjects = await userService.getAllSubject();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const user = await userService.getSubjectById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const newSubject = await userService.addSubject(req.body);
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
