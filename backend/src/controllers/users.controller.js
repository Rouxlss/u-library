const usersCtrl = {};

const User = require('../models/User');

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

usersCtrl.createUser = async (req, res) => {
    const {first_name,last_name,email,role} = req.body;
    const newUser = new User({first_name,last_name,email,role});
    await newUser.save();
    res.json({message: 'User Saved'})
};

usersCtrl.getUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
}

usersCtrl.updateUser = async (req, res) => {
    const {first_name,last_name,email,role} = req.body;
    const id = req.params.id;
    await User.findByIdAndUpdate(id, {first_name,last_name,email,role});
    res.json({message: 'User Updated'})
};

usersCtrl.deleteUser = async (req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.json({message: 'User Deleted'})
};

module.exports = usersCtrl;