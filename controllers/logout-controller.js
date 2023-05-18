const User = require("../models/User");

const logout = async (req, res) => {
  console.log("[GET]: logout");
  // delete access token on client
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(204).json({ message: "no refresh token" }); // no content
  }
  const refreshToken = cookies.jwt;
  // find refresh token in db
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    return res.status(204).json({ message: "user not found" });
  }
  // clear refresh token in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    // secure: true,
  });
  return res.status(204).json({ message: "cookies has cleared" }); // no content
};

module.exports = { logout };
