import mongoose from "mongoose";
import UserModel from "../models/user.js";

mongoose.set("debug", true);

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = UserModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

function findUserById(id) {
  return UserModel.findById(id);
}

function addUser(user) {
  const userToAdd = new UserModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return UserModel.find({ name: name });
}

function findUserByJob(job) {
  return UserModel.find({ job: job });
}

function deleteUser(id) {
  return UserModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUser,
};
