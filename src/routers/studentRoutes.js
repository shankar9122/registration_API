const express = require("express");
const { addStudent, updateStudent, getAllStudents, getSingleStudent, deleteStudent } = require("../controllers/studentController");

const { isAuthenticatedUser } = require("../middleware/auth");


const studentRoute = express.Router();


studentRoute.route("/add-student").post(isAuthenticatedUser, addStudent);

studentRoute.route("/all-students").get(isAuthenticatedUser, getAllStudents);

studentRoute.route("/student/:id").get(isAuthenticatedUser, getSingleStudent).post(isAuthenticatedUser, updateStudent)
    .delete(isAuthenticatedUser, deleteStudent);


    
module.exports = studentRoute;