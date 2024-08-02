import { Router } from "express";
import { addProduct, deleteProduct, filterProducts, getAllProducts, getSingleProduct, paginatedProducts } from "../Controllers/product.controller.js";
import { addProductValidator, filterProductValidator, validateHandler } from "../lib/validators.js";
const router = Router()

router.post('/add', addProductValidator(), validateHandler, addProduct)
router.delete('/delete/:id', deleteProduct)

router.get('/products', getAllProducts)
router.get('/products?featured=true', getAllProducts)
router.get('/products/:id', getSingleProduct)
router.get('/productsfilter', filterProductValidator(), validateHandler, filterProducts)
router.get("/productspagination", paginatedProducts);



export default router;