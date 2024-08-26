import Category from "../Models/category.model.js";

export const addCategory = async (req, res) => {
  const name = req.body.name;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Provide provide a category name !" });
    }

    const checkIfExist = await Category.findOne({ name: name });

    if (checkIfExist)
      return res.status(400).json({
        success: false,
        message: `Category with name ${name} already exist !`,
      });

    const newCategory = await Category.create({
      name,
    });

    return res.status(201).json({
      success: true,
      message: `category ${name} added successfully`,
      category: newCategory,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error while adding new category" });
  }
};

export const fetchAllCatagories = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories)
      return res.status(400).json({ message: "categories not found !" });
    return res
      .status(200)
      .json({ message: "categories found successfully !", categories });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error while removing the company" });
  }
};

export const removeCategory = async (req, res) => {
  const name = req.body.name;

  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Provide provide a category name !" });
    }

    const checkIfExist = await Category.findOne({ name: name });

    if (!checkIfExist)
      return res.status(400).json({
        success: false,
        message: `Category ${name} doesn't exist !`,
      });

    const newCategory = await Category.deleteOne({
      name,
    });

    return res.status(201).json({
      success: true,
      message: `${name} removed successfully`,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error while removing the company" });
  }
};
