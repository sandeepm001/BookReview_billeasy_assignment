const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return res.status(401).json({ message: "Invalid token format" });
        req.user = user;
        next()
    });
};

module.exports = { verifyToken };