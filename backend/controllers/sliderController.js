const Slider = require('../models/slider');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const cloudinary = require('cloudinary');

const APIFeatures = require('../utils/apiFeatures');

/**
 * create new slider
 */

exports.newSlider = catchAsyncErrors(async (req, res, next) => {
   
    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'slider'
        });

         imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks;
    
    const slider = await Slider.create(req.body);
    console.log('req.body', req.body)

    res.status(201).json({
        success: true,
        slider
    })
    console.log('SLIDER', slider);

})

/**
 * get Slider
 */


exports.getSlider = catchAsyncErrors(async (req, res, next) => {

    const apiFeatures = new APIFeatures(Slider.find(), req.query)
                       .search()
                        .filter()
                        
    let slider = await apiFeatures.query;

    res.status(200).json({
        success: true, 
        slider
        
    })
})

