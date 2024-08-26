import { Router } from "express";
import { addCompany, fetchAllCompanies, removeCompany } from "../Controllers/company.controller.js";
import { nameBodyValidator, validateHandler } from "../lib/validators.js";

const router = Router();

router.get('/', fetchAllCompanies)
router.post('/add', nameBodyValidator(), validateHandler, addCompany)
router.delete('/remove', removeCompany)



export default router;