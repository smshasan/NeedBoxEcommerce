const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');

const Object = require('mongoose').Types.ObjectId


//Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id

    })

    res.status(200).json({
        success: true,
        order
    })
})

//Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})


//Get logged in user orders => /api/v1/orders/me
exports.myOrders= catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})


//Get all orders - ADMIN => /api/v1/admin/orders/
exports.allOrders= catchAsyncError(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//Update / Process orders - ADMIN => /api/v1/admin/order/:id
exports.updateOrder= catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status;
    order.deliverdAt = Date.now();
    await order.save();

    res.status(200).json({
        success: true
    })
})

async function updateStock(id, qunatity) {
    const product = await Product.findById(id);

    product.stock = product.stock - qunatity;

    await product.save({ validateBeforeSave: false});
}


//Delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {

    if(!Object.isValid(req.params.id)) return res.status(404).json({message : `No order found with this ID: ${req.params.id}`})
   
    try {

        let testOrder = await Order.findById({_id: req.params.id})
        if (testOrder) {
           // return res.json(testOrder)
            await Order.deleteOne({ _id: req.params.id })
            
            return res.status(201).json({message : 'removed the Order'})
        } else {
            return res.status(404).json({message : 'we have not some order id'})
                    }
    } catch (error) {
        return res.status(404).json({message : error.message})
    }
    
})



// Create new review => /api/v1/review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true

    })
})


// Get Product Reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})


//Delete review of a product => /api/v1/reviews
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true, 
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    
    })
})








/*
const order = await Order.findById(req.params.id)
    
    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404))
    }
    
    await order.remove()

    res.status(200).json({
        success: true
    })
*/