import { Router } from "express";
import {
  addCategory,
  removeCategory,
  fetchAllCatagories,
} from "../Controllers/category.controller.js";
import { nameBodyValidator, validateHandler } from "../lib/validators.js";

const router = Router()

router.get('/', fetchAllCatagories)
router.post('/add', nameBodyValidator(), validateHandler, addCategory)
router.delete('/remove', removeCategory)

export default router