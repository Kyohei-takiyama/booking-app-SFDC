// outer module
import { Router } from "express";

// inner module
import { register, login } from "../controller/auth.js";
const route = Router();

//===============================================GET
//===============================================POST
route.post("/register", register);
route.post("/login", login);
//===============================================PUT
//===============================================DELETE

export default route;
