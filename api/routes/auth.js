const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // find user in db
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json("ungas! wrong credentials!");
    }

    // find password in db and decrypt
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET
    );
    const savedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    // compare passwords
    if (password !== savedPassword) {
      return res.status(401).json("ungas! wrong credentials!");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // send back userData only without password
    const { password: userPassword, ...userData } = user._doc;
    res.status(200).json({ ...userData, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
