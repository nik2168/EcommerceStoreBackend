import { Router } from "express";
import { addCartItem, getCartData, removeCartItem } from "../Controllers/cart.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { addCartItemValidator, validateHandler } from "../lib/validators.js";

const router = Router()

router.use(isAuthenticated)

router.post('/', getCartData)
router.post('/updateitems', addCartItemValidator(), validateHandler, addCartItem)
router.delete('/removeitem/:id', removeCartItem)
// router.put('/update',  cartUpdateValidator(), validateHandler, updateItemQuantity)

export default router;