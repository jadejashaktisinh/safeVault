const userSchema = require('../../models/UserSchema');
const bcrypt = require('bcrypt');
const addActivity = require('../../utils/ActivityLoger');
const generateToken = require('../../utils/GenrateToken');

const Signup = async (req, res) => {

    let IsAlredyLogedIn = await userSchema.findOne({ email: res.locals.data.email });

    if (!IsAlredyLogedIn) {

        await bcrypt.hash(res.locals.data.password, 10).then((hash) => {
            res.locals.data.password = hash;
        })

        newUser = new userSchema(res.locals.data);

        const user = await newUser.save()

        if (user) {

            addActivity(user._id, "login", "created account");
            const tokens = await generateToken(user._id, res.locals.data.remember);
            console.log("tokens", tokens);
            res.cookie("token", tokens.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
            });

            if (tokens.refreshToken) {
                res.cookie("refreshToken", tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 30 * 24 * 60 * 60 * 1000
                });
            }

            return res.status(200).send({
                success: true,
                message: "sign up successfull",
                name: user.firstName + " " + user.lastName,
                _id: user._id
            })
        } else {

            return res.status(400).send({ success: false, message: 'something went wrong ' })
        }

    } else {
        return res.status(400).send({ success: false, message: 'user already exists' })
    }
}

module.exports = Signup