const mongoose = require('mongoose');
const sliderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // trim: true
    },
    images: [
        {
            public_id: {
                type: String,
                // required: true
            },
            url: {
                type: String,
                // required: true
            }

        }
    ]
     
});

module.exports = mongoose.model("Slider", sliderSchema);
