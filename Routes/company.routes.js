import { Router } from "express";
import { addCompany, removeCompany } from "../Controllers/company.controller.js";

const router = Router();

router.post('/add', addCompany)
router.delete('/remove', removeCompany)



export default router;