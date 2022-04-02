const User = require('../models/User');
const bcrypt = require('bcrypt');
const userController = {
    registerUser: async (req, res) => {
        try {
            //create user
             const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newUser = new User(
                {
                    username: req.body.username,
                    email: req.body.email,
                    password: hashed,
                }
            );
            //save to database
            const user = await newUser.save();
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({
                username: req.body.username
            })
            if (!user) return res.status(404).json("Incorrect username!");

            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (user && validPassword) {
                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
module.exports = userController;