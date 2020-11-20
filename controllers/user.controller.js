const User = require("../models/User");

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.status(200).json({user})
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}