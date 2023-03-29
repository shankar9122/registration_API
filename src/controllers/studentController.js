const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Student = require("../modals/student");

exports.addStudent = catchAsyncError(async (req, res, next) => {
    const { name, email, gender, mobile, address, pinCode, city, state, board, dob, standard, profilePic } = req.body;

    let result = await Student.create({
        name,
        email,
        gender,
        mobile,
        address,
        pinCode,
        city,
        state,
        board,
        dob,
        standard,
        profilePic,
        updateBy: req.user.name,
        updatedDate: new Date()
    })

    res.status(200).json({
        success: true,
        result: result,
        message: "Student Created Successfully."
    });
});


exports.updateStudent = catchAsyncError(async (req, res, next) => {

    const updateDate = {
        ...req, body,
        updateBy: req.user.name,
        updatedDate: new Date()
    }

    const student = await Student.findByIdAndUpdate(req.body.id, updateDate, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        message: "Updated SuccessFully.",
    });
})


exports.getAllStudents = catchAsyncError(async (req, res, next) => {
    const students = await Student.find();

    res.status(200).json({
        success: true,
        result: students,
    });
});


exports.getSingleStudent = catchAsyncError(async (req, res, next) => {

    const student = await Student.findById(req.params.id);

    if (!student) {
        return next(
            new ErrorHandler(`student does not exist with Id: ${req.params.id}`)
        );
    };
    res.status(200).json({
        success: true,
        result: student,
    });
})

exports.deleteStudent = catchAsyncError(async (req, res, next) => {

    const student = await Student.findById(req.params.id);

    if (!student) {
        return next(
            new ErrorHandler(`student does not exist with Id: ${req.params.id}`)
        );
    };

    await student.remove();

    res.status(200).json({
        success: true,
        message: "Deleted successfully.",
    });
})