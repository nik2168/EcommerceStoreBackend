import { Router } from "express";
import { addCategory, removeCategory } from "../Controllers/category.controller.js";

const router = Router()

router.post('/add', addCategory)
router.delete('/remove', removeCategory)

export default router