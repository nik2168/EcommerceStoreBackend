import mongoose from "mongoose";
import Category from "../Models/category.model.js";
import Company from "../Models/company.model.js";
import Product from "../Models/product.model.js";

export const addProduct = async (req, res) => {
  const {
    title,
    company,
    description,
    featured,
    category,
    image,
    price,
    shipping,
    colors,
  } = req.body;

  try {
    const checkProduct = await Product.findOne({ title: title });
    if (checkProduct) {
      return res
        .status(400)
        .json({ success: false, message: "product already exist !" });
    }

    const companyId = await Company.findOne({ name: company }).lean();
    const categoryId = await Category.findOne({ name: category }).lean();
    const newProduct = await Product.create({
      title,
      company: companyId._id.toString(),
      description,
      featured,
      category: categoryId._id.toString(),
      image,
      price,
      shipping,
      colors,
    });

    res.status(201).json({
      success: true,
      message: `new product ${title} added successfully !`,
      product: newProduct,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `Error while adding new product ${title} !`,
    });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: `product not found 1` });
    }
    const productDeleted = await Product.deleteOne({ _id: productId });

    return res.status(201).json({
      success: true,
      message: `product ${product.title} deleted successfully !`,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `Error while deleting the product !`,
    });
  }
};

export const getAllProducts = async (req, res) => {
  const featured = req.query.featured;

  try {
    if (featured) {
      const products = await Product.find({ featured: true })
        .populate("company")
        .populate("category");
      if (!products) {
        return res
          .status(400)
          .json({ success: false, message: `products not found !` });
      }

      return res.status(200).json({
        success: true,
        message: `all product found successfully !`,
        products,
      });
    }

    const products = await Product.find({})
      .populate("company")
      .populate("category");

    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: `products not found 1` });
    }

    return res.status(200).json({
      success: true,
      message: `all product found successfully !`,
      products,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `Error while searching all the products !`,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: `please provide product id`,
      });
    }

    const product = await Product.find({ _id: productId })
      .populate("company")
      .populate("category");

    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: `product not found !` });
    }

    return res.status(200).json({
      success: true,
      message: `all product found successfully !`,
      product,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `Error while searching single product
       !`,
    });
  }
};

export const filterProducts = async (req, res) => {
  const { search, category, company, order, price, shipping } = req.query;

  try {


    const filterObj = {
      title: { $regex: search, $options: "i" },
      price: { $lt: price },
      shipping: shipping,
    };

    if (category.toString() !== "all") {
      const categoryData = await Category.findOne({
        name: category.toString(),
      });
      filterObj["category"] = categoryData._id.toString();
    }


    if (company.toString() !== "all") {
      const companyData = await Company.findOne({
        name: company.toString(),
      });
      filterObj["company"] = companyData._id.toString();
    }
    
    let products;

    if (order.toString() !== "none") {
      if (order.toString() === "a-z") {
        products = await Product.find(filterObj, null, { sort: { title: 1 } })
          .populate("company")
          .populate("category");
      }
      if (order.toString() === "z-a") {
        products = await Product.find(filterObj, null, { sort: { title: -1 } })
          .populate("company")
          .populate("category");
      }
      if (order.toString() === "low") {
        products = await Product.find(filterObj, null, { sort: { price: 1 } })
          .populate("company")
          .populate("category");
      }
      if (order.toString() === "high") {
        products = await Product.find(filterObj, null, { sort: { price: -1 } })
          .populate("company")
          .populate("category");
      }
    } else{
      products = await Product.find(filterObj)
        .populate("company")
        .populate("category");
    }

    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: `products not found !` });
    }

    return res.status(200).json({
      success: true,
      message: `filtered products found successfully !`,
      products,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: `Error while filtering products !, ${err}`,
    });
  }
};

export const paginatedProducts = async (req, res) => {
  const { page = 1 } = req.query;

  try {
    const limit = 20;
    const skip = (page - 1) * limit;

    const [products, totalProductCount] = await Promise.all([
      Product.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("company")
        .populate("category")
        .lean(),

      Product.countDocuments({}),
    ]);

    const totalPages = Math.ceil(totalProductCount / limit) || 0; // math ceil will roundoff the value

    return res
      .status(200)
      .json({ success: true, products: products, totalPages });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "error while pagination the products",
      err,
    });
  }
};
