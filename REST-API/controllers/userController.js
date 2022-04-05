const User = require('../models/User');
const bcrypt = require('bcrypt');
const logEvents = require('../helpers/logEvents');
const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            return res.status(200).json(users);
        } catch (error) {
            logEvents(`${req.url} - ${req.method} - ${error.message}`);
            return res.status(500).json(error.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hased = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hased
            });
            const savedUser = await user.save();
            return res.status(200).json(savedUser);
        } catch (error) {
            logEvents(`${req.url} - ${req.method} - ${error.message}`);
            return res.status(500).json(error.message);
        }
    },
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(404).json("Incorrect username");
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) return res.status(404).json("Invalid password");
            if (user && validPassword) {
                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others});
            }
        } catch (error) {
            logEvents(`${req.url} - ${req.method} - ${error.message}`);
            return res.status(500).json(error.message);
        }
    }
}
module.exports = userController;