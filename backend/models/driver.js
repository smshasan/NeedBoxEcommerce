const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },

    phone: {
        type: String,
        required: [true, 'Please enter valid 11 digit number'],
        unique: true
    },

    Address: {
        type: String,
        // required: [false, 'Please enter valid address'],
        maxLength: [100, 'Address  cannot exceed 100 characters']
    },

    nid: {
        type: String,
        requred: [true, 'Please enter your valid NID or birth certificate number'],
        minLength: [10, 'NID number cannot be less than 10 characters'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Please enter password'],
        minLength: [8, 'password must be longer than 8 characters'],
        select: false
    },

    avatar: {
        public_id: {
            type: String,
            required: true        // true
        },
        url: {
            type: String,
            required: true      // true
        }
    },

    role: {
        type: String,
        default: 'delivery man'
    },

      createdAt: {
            type: Date,
            default: Date.now
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date

})

//Encrypting Password before saving
driverSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// Compares user password
driverSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


//Return JWT Token
driverSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '72h'
    });
}


// Generating password reset token
driverSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expire time 
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model('Driver', driverSchema);