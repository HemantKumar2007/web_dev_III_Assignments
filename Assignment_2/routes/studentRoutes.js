const express = require("express");
const router = express.Router();

let students = require("../data/students");

// ==========================================
// GET /students
// Get all students
// ==========================================
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});


// ==========================================
// GET /students/:id
// Get student by ID
// ==========================================
router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });
    }

    const student = students.find(
        student => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        data: student
    });
});


// ==========================================
// POST /students
// Create new student
// ==========================================
router.post("/", (req, res) => {

    const { name, age, course } = req.body;

    // Validation
    if (!name || !age || !course) {
        return res.status(400).json({
            success: false,
            message: "Name, age and course are required"
        });
    }

    if (isNaN(age) || age <= 0) {
        return res.status(400).json({
            success: false,
            message: "Age must be a valid positive number"
        });
    }

    // Generate new ID
    const newId =
        students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1;

    const newStudent = {
        id: newId,
        name: name,
        age: Number(age),
        course: course
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: newStudent
    });
});


// ==========================================
// PUT /students/:id
// Update student
// ==========================================
router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });
    }

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { name, age, course } = req.body;

    if (!name || !age || !course) {
        return res.status(400).json({
            success: false,
            message: "Name, age and course are required"
        });
    }

    if (isNaN(age) || age <= 0) {
        return res.status(400).json({
            success: false,
            message: "Age must be a valid positive number"
        });
    }

    students[studentIndex] = {
        id: id,
        name: name,
        age: Number(age),
        course: course
    };

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: students[studentIndex]
    });
});


// ==========================================
// DELETE /students/:id
// Delete student
// ==========================================
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid student ID"
        });
    }

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        data: deletedStudent[0]
    });
});


module.exports = router;