import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { success, error } from "../shared/response-map";
import { ValidationMessages } from "../shared/constant-helper";
import { updateCache } from "../middlewares/cacheMiddleware";
import { fetchGpsData } from "../services/gpsService";

const { SOMETHING_ERROR_OCCURRED } = ValidationMessages;

class GpsLocation {
  async getGpsLocation(req: Request, res: Response, next: NextFunction) {
    try {
      const gpsId = req.query.gpsId as string;

      // Fetch GPS data from external API (or cache)
      const gpsData = await fetchGpsData(gpsId);
      await updateCache(gpsId, gpsData); // Update Redis cache with new data

      // Send success response with GPS data
      return success(req, res, gpsData);
    } catch (err) {
      // Handle errors and send a response
      error(req, res, SOMETHING_ERROR_OCCURRED);
      next(err);
    }
  }
}

const instance = new GpsLocation();
export default instance;
