const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userschema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Please check your email')

        }
    },

    password: {
        type: String,
        required: true,
        tirm: true,
        minlength: 5,
        validate(value) {
            if (value.length < 5)
                throw new Error('Password should be of Minimum length 5 ')
        }

    }
})
userschema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8);
    next()
})

userschema.methods.genrateAuthToken = async function () {
    try {
        const user = this
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
        // console.log(user)
        return token
    }

    catch (e) {
        throw new Error()
    }
}
userschema.statics.findByCredentials = async (em, password) => {
    const user = await User.findOne({ email: em })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user

}

const User = mongoose.model('User', userschema)
module.exports = User