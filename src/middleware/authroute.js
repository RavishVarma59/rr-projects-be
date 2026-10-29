const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        const {TOKEN} = cookies;
        if (!TOKEN) {
            res.status(401).send({
                message: "Token not valid !"
            })
        }
        const decodeObj = await jwt.verify(TOKEN, process.env.JWT_TOKEN);
        const {id} = decodeObj;

        const user = await User.getUserById(id);
        if(!user) {
            throw Error("User Not Found!");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(500).send({
            message : err.message
        });
    }
}

module.exports = userAuth;