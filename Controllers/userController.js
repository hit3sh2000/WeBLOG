const mongoose = require('mongoose');
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Blog = mongoose.model('Blog');
const User = mongoose.model('User');
const {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken
} = require('../Middlewares/jwt_helper');

exports.addUser = async (req, res) => {
    try {
        const { uname, email, password, contactno } = req.body;

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const user = new User();
        user.uname = uname
        user.email = email
        user.password = hashPassword
        user.contactno = contactno
        user.save((err, doc) => {
            if (!err) {
                res.json(user)
            }
            else {
                console.log(err);
            }
        });
    } catch (error) {
        console.log(error);
    }
}


exports.getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        console.log(error);
    }
}

exports.getPosts = async (req, res) => {
    try {
        // const id = req.params.id
        const user = await User.findById(req.user).populate('blogs')
        res.json(user);
    } catch (err) {
        console.log(error);
    }
}


exports.Login = async (req, res) => {

    try {
        var un = req.body.uname
        var password = req.body.password

        const user = await User.findOne({
            uname: un
        })

        if (user == null) {
            return res.status(400).send('cannot find user')
        }
        const checkpassword = await bcrypt.compare(password, user.password);


        if (checkpassword) {
            const accessToken = await signAccessToken(user.id)

            res.json({ auth: true, token: accessToken, result: user })

        } else {
            res.json({ auth: false, message: "Not allowed" })
        }
    } catch (err) {
        res.json({ auth: false, err, message: "Not allowed" })
    }
}