const jwt = require("jsonwebtoken");

// verify authenticity of json web tokebn
const verifyToken = (req, res, next) => {
  // capture token from the request headers
  const authHeader = req.headers.token;

  // if the token exists, verify it
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      // return error if token is invalid
      if (err) res.status(403).json("token is not valid!");

      // if token is valid, assign db user as the req.user
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("ungas! you are not authenticated");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that!");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
