const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and pasword are required" });
  }

  if (username === "admin") {
    const result = await User.findOne({ username });
    if (result) {
      Object.values(result.roles).map((role) => {
        console.log(role);
      });
    }
  }

  // check for duplicate user in DB
  const duplicate = await User.findOne({ username }).exec();
  if (duplicate) {
    return res
      .status(409)
      .json({ message: "user with this name have already created" }); // conflict
  }

  try {
    // create and store new user in DB
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      username: username,
      password: hashedPassword
    });
    res.status(201).json({ success: `user ${username} was created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerNewUser };
