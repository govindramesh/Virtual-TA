const express = require("express");
const { getNotes, createNote } = require("../controllers/noteController");

const router = express.Router();

// GET all workouts
router.get("/", getNotes);

// GET a single workout
// router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createNote);

// // DELETE a workout
// router.delete("/:id", deleteWorkout);

// // UPDATE a workout
// router.patch("/:id", updateWorkout);

module.exports = router;
