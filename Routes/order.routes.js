import { Router } from "express";
import {
  createNewOrder,
  getAllOrders,
} from "../Controllers/order.controller.js";
import { createOrderValidator, validateHandler } from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(isAuthenticated);

router.get("/", getAllOrders);
router.post("/create", createOrderValidator(), validateHandler, createNewOrder);

export default router;
