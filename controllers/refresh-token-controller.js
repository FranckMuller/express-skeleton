const jwt = require("jsonwebtoken");
const User = require("../models/User");

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).json({ message: "no refresh token" }); // Unauthorized
  }
  const refreshToken = cookies.jwt;
  // find user in data base by refresh token
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    return res.status(403).json({ message: "user not found" }); // Forbidden
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded.username !== foundUser.username) {
      return res.sendStatus(403); // Forbidden
    }
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: foundUser.username,
          roles: foundUser.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );
    res.json({ accessToken });
  });
};

module.exports = { refreshToken };
