import * as express from "express";
import controller from "../controllers/gpsController";
import validateToken from "../shared/security/verify-token";
import { cacheMiddleware } from "../middlewares/cacheMiddleware";

const router = express.Router();
const { getGpsLocation } = controller;

// Apply token validation and caching middleware
router.get("/", validateToken, cacheMiddleware, getGpsLocation);

export default router;
