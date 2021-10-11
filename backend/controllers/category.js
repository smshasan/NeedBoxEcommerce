const Category = require("../models/category");
const slugify = require("slugify");
const shortid = require("shortid");
const cloudinary = require('cloudinary');
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
// const category = require("../models/category");

function createCategories(categories, parentId = "") {
  const categoryList = [];
  var category;
  if (parentId != null) category = categories.filter(cat => cat.parentId == parentId);
  if (parentId === "") category = categories.filter(cat => cat.parentId === "" )
  

  // if (parentId == null) {
  //   category = categories.filter(cat => cat.parentId == "");
  // } else {
  //   category = categories.filter(cat => cat.parentId == parentId);
  // }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      images: cate.images,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }

  return categoryList;
}

//slug: `${slugify(req.body.name)}-${shortid.generate()}`,

exports.addCategory = catchAsyncErrors( async (req, res, next) => {


  let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

     let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'categories'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

  req.body.images = imagesLinks
  req.body.slug = `${slugify(req.body.name)}-${shortid.generate()}`

  req.body.createdBy = req.user.id;

    const category = await Category.create(req.body);
    res.status(201).json({
        success: true,
        category
    })

})





exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({
        categoryList,
      });
    }
  });
};

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i]._id,
      createdBy: req.user._id,
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
