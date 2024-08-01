import { Router } from "express";
import { verifyLoginBody, verifySignUpBody } from "../middlewares/user.middlewares.js";
import { userLogin, userSignUp } from "../Controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";


const router = Router();



router.post("/login", verifyLoginBody, userLogin);
router.post("/signup", verifySignUpBody, userSignUp);


router.use(isAuthenticated)

export default router;
