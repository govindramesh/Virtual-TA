require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const noteRoutes = require("./routes/noteRoute");
const userRoutes = require("./routes/userRoute");
const app = express();

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });
app.use(express.json());
app.use(cors());
app.use("/api/notes/", noteRoutes);
app.use("/api/user/", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
// app.listen(process.env.PORT, () => {
//   console.log("Listening on port", process.env.PORT);
// });
