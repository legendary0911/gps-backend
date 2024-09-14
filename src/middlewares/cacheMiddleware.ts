import { Request, Response, NextFunction } from "express";
import redisClient from "../utils/redisClient";

export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gpsId } = req.query;
  const isAdmin = req.user?.isAdmin;

  if (!gpsId) {
    return res.status(400).json({ message: "GPS ID is required" });
  }

  // If the user is an admin, bypass the cache
  if (isAdmin) {
    return next();
  }

  try {
    // Check if data is cached
    const cachedData = await redisClient.get(gpsId as string);
    if (cachedData) {
      // Serve from cache if data is found
      return res.json(JSON.parse(cachedData));
    }

    next(); // Proceed to fetch new data if not found in cache
  } catch (error) {
    console.error("Redis error:", error);
    next();
  }
};

// Function to update the cache
export const updateCache = async (gpsId: string, data: any) => {
  try {
    // Store data in Redis with a 5-minute expiration time
    await redisClient.set(gpsId, JSON.stringify(data), { EX: 5 * 60 });
  } catch (error) {
    console.error("Redis error:", error);
  }
};
