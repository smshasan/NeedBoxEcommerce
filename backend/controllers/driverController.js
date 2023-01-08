const Driver = require('../models/driver')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('cloudinary');
const sendToken = require('../utils/jwtToken');



//Register a driver => /api/v1/register/deliveryMan
exports.registerDeliveryMan= catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })
    
    const { name, phone, address, nid, password } = req.body;
    const deliveryMan = await Driver.create({
        name,
        phone,
        address,
        nid,
        password,
        avatar: {
            public_id: result.public_id ,
            url: result.secure_url
        }
    })

   sendToken(deliveryMan, 200, res)

})

//LoginDriver => /api/v1/login/deliveryMan
exports.loginDeliveryMan = catchAsyncErrors(async (req, res, next) => {
    const { phone, password } = req.body;

    //Checks if email and password is entered by user
    if (!phone|| !password) {
        return next(new ErrorHandler('Please enter phone number & password', 400))
    }
    // finding user in database
    const deliveryMan = await Driver.findOne({ phone }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid phone or password', 401));
    }

    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid phone or password', 401));
    }

    sendToken(deliveryMan, 200, res)
})


// Get all delivery man   =>   /api/v1/admin/deliveryMen
exports.allDeliveryMen = catchAsyncErrors(async (req, res, next) => {
    const deliveryMen = await Driver.find(); 

    res.status(200).json({
        success: true,
        deliveryMen
    })
})
