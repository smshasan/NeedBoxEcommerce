const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    // categoryImage: { type: String },

    images: [
        {
            public_id: {
                type: String,
                // required: true
            },
            url: {
                type: String,
                //  required: true
            },
        }
    ],

    parentId: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }                                                       
);

module.exports = mongoose.model("Category", categorySchema);
