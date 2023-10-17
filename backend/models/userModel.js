const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, name, password) {
  if (!name) {
    throw Error("Please include your name");
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, name, password: hash });

  return user;
};

userSchema.statics.login = async function (email, name, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};
module.exports = mongoose.model("User", userSchema);
