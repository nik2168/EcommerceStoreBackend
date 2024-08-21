import { body, validationResult, param, query } from "express-validator";

export const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors
    .array()
    .map((err) => err.msg)
    .join(", ");

  if (errors.isEmpty()) next();
  else {
    res.status(400).json({ success: false, message: errorMessages });
  }
};

export const nameBodyValidator = () => [
  body("name", "please enter the category name").notEmpty(),
];

export const addProductValidator = () => [
  body("title", "please enter the title for new product").notEmpty(),
  body("company", "please enter the company for new product").notEmpty(),
  body(
    "description",
    "please enter the description for new product"
  ).notEmpty(),
  body("featured", "please enter the featured for new product").notEmpty(),
  body("category", "please enter the category for new product").notEmpty(),
  body("image", "please enter the image for new product").notEmpty(),
  body("price", "please enter the price for new product").notEmpty(),
  body("shipping", "please enter the shipping for new product").notEmpty(),
  body("colors", "please enter the description for new product")
    .notEmpty()
    .isArray({ min: 1 })
    .withMessage("Please provide atleast one color"),
];

export const filterProductValidator = () => [
  query("search", "Please provide a name of filter product").notEmpty(),
  query("company", "Please provide a company of filter product").notEmpty(),
  query("category", "Please provide a category of filter product").notEmpty(),
  query("price", "Please provide a price of filter product").notEmpty(),
  query("order", "Please provide a order to sort the products").notEmpty(),
  query(
    "shipping",
    "Please provide a shipping status of filter product"
  ).notEmpty(),
];

export const createOrderValidator = () => [
  body("name", "Please provide a order name").notEmpty(),
  body("cartItems", "Please provide a order cartItems")
    .notEmpty()
    .isArray({ min: 1 })
    .withMessage("Please provide 1 product to make a order"),
  body("address", "Please provide a order address").notEmpty(),
  body("orderTotal", "Please provide a order orderTotal").notEmpty(),
];

export const addCartItemValidator = () => [
  body("productId", "Please provide a product id").notEmpty(),
  body("quantity", "Please provide the quantity of the product").notEmpty(),
];

export const cartUpdateValidator = () => [
  body("productId", "Please provide the product id").notEmpty(),
  body("quantity", "please provide the quantity to update").notEmpty(),
];
