import { Router } from "express";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";

const authRoutes = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

authRoutes.post("/auth", (req, res) => authController.signIn(req, res));

export default authRoutes;
