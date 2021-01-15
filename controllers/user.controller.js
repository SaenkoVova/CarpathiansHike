const { Types } = require("mongoose");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const sharp = require("sharp");
const { findOneAndUpdate } = require("../models/User");
const fs = require('fs');

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.status(200).json({user})
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.updateEmail = async (req, res) => {
    try {
        const {email} = req.body;
        const candidate = await User.findOne({email});
        if(candidate) {
            return res.status(400).json({message: 'Користувач уже існує'});
        }
        await User.findOneAndUpdate(
            {_id: Types.ObjectId(req.user.userId)},
            {email}
        );
        res.status(200).json({message: 'Емейл змінено'});
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.updateName = async (req, res) => {
    try {
        const {name} = req.body;
        await User.findOneAndUpdate(
            {_id: Types.ObjectId(req.user.userId)},
            {name}
        );
        res.status(200).json({message: 'Ім`я змінено'});
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.updatePassword = async (req, res) => {
    try {
        const {currentPassword, newPassword} = req.body;
        const user = await User.findById(req.user.userId);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Невірний поточний пароль'});
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await User.findOneAndUpdate(
            {_id: Types.ObjectId(req.user.userId)},
            {password: hashedPassword}
        );
        res.status(200).json({message: 'Пароль змінено'});
    } catch(e) {
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}

module.exports.updateAvatar = async (req, res) => {
    try {
        const file = req.file;
        let fileNameParts = file.originalname.split('.');
        let fileExtention = fileNameParts[fileNameParts.length - 1];
        file.originalname = `${req.user.userId}.${fileExtention}`;
        if(process.env.NODE_ENV === 'production') {
            try {
                fs.unlinkSync(`./client/dist/img/${file.originalname}`);
            } catch(e) {
                
            }
            await sharp(file.path).toFile(`./client/dist/img/${file.originalname}`);
        }
        else {
            try {
                fs.unlinkSync(`./client/src/assets/avatars/${req.user.userId}`);
            } catch(e) {

            }
            await sharp(file.path).toFile(`./client/src/assets/avatars/${file.originalname}`);
        }
        await User.findOneAndUpdate(
            {_id: Types.ObjectId(req.user.userId)},
            {avatar: file.originalname}
        );
        res.status(200).json({
            message: 'Зображення профілю змінено',
            originalname: file.originalname
        });
    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Щось пішло не так, спробуйте знову'});
    }
}