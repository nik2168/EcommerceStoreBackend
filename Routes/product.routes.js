import { Router } from "express";
import { addProduct, deleteProduct, filterProducts, getAllProducts, getSingleProduct } from "../Controllers/product.controller.js";
const router = Router()

router.post('/add', addProduct)
router.delete('/delete/:id', deleteProduct)

router.get('/products', getAllProducts)
router.get('/products?featured=true', getAllProducts)
router.get('/products/:id', getSingleProduct)
router.get('/productsfilter', filterProducts)



export default router;