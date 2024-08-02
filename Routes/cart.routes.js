import { Router } from "express";
import { addCartItem, getCartData, removeCartItem, updateItemQuantity } from "../Controllers/cart.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addCartItemValidator, cartUpdateValidator, validateHandler } from "../lib/validators.js";

const router = Router()

router.use(isAuthenticated)

router.get('/', getCartData)
router.post('/additem', addCartItemValidator(), validateHandler, addCartItem)
router.put('/removeitem/:id', removeCartItem)
router.put('/update',  cartUpdateValidator(), validateHandler, updateItemQuantity)

export default router;