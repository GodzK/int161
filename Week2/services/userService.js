const subjectRepo = require("../repositories/userRepository");

exports.getAllSubject = async () => {
  return await subjectRepo.findAll();
};

exports.getSubjectById = async (id) => {
  return await subjectRepo.findById(id);
};

exports.addSubject = async (userData) => {
  if (!userData.name) {
    throw new Error("Name is required");
  }
  return await userRepo.create(userData);
};
