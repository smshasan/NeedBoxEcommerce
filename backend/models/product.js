const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 character']
    },
    price: {
        type: String,
        required: [true, 'Please enter product price'],
        maxLength: [100, 'Product price cannot exceed 100 character'],
        default: 0.0
    },
    discount: {
        type: String,
        maxLength: [100, 'Product price cannot exceed 100 character'],
        default: 0.0
    },

    description: {
        type: String,
        required: [true, 'Please enter description']
    },
    ratings: {
        type: String,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    // 
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    seller: {
        type: String,
        required: [true, 'Please enter seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [true, 'Product cannot exceed 5 characters']
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }

        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    

})
module.exports = mongoose.model('Product', productSchema);