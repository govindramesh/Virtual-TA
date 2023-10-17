const Note = require("../models/noteModel");

// get all notes
const getNotes = async (req, res) => {
  const notes = await Note.find({});

  res.status(200).json(notes);
};

// get a single workout
// const getWorkout = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such workout" });
//   }

//   const workout = await Workout.findById(id);

//   if (!workout) {
//     return res.status(404).json({ error: "No such workout" });
//   }

//   res.status(200).json(workout);
// };

// create a new note
const createNote = async (req, res) => {
  const { name, subject, date_created, date_accessed, text } = req.body;

  if (!(name && subject && date_created && date_accessed)) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }
  // add to the database
  try {
    const note = await Note.create({
      name,
      subject,
      date_created,
      date_accessed,
      text,
    });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
// const deleteWorkout = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "No such workout" });
//   }

//   const workout = await Workout.findOneAndDelete({ _id: id });

//   if (!workout) {
//     return res.status(400).json({ error: "No such workout" });
//   }

//   res.status(200).json(workout);
// };

// // update a workout
// const updateWorkout = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "No such workout" });
//   }

//   const workout = await Workout.findOneAndUpdate(
//     { _id: id },
//     {
//       ...req.body,
//     }
//   );

//   if (!workout) {
//     return res.status(400).json({ error: "No such workout" });
//   }

//   res.status(200).json(workout);
// };

module.exports = {
  getNotes,
  createNote,
};
