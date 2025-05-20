const bcrypt = require('bcrypt');
const User = require('../models/User')
const {createError} = require('../middlewares/createError')
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists" });
        }
        await newUser.save();
        res.status(200).send("User has been created!");
    } catch (err) {
        next(err);
    }
};

const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT,
            {expiresIn:'2m'}
        );

        const { password, ...others } = user._doc;

        res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({...others , token});
  } catch (err) {
    next(err);
  }
};

module.exports = {signin , signup};