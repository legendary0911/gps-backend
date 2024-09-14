import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface VehicleData {
  VEHICLE_ID: string;
  VEHICLE_LAT: string;
  VEHICLE_LONG: string;
  VEHICLE_LOCATION: string;
  VEHICLE_GPS_DATETIME: string;
  [key: string]: any;
}

const API_URL = "https://www.trinetrafms.com/TrinetraAPI/FMSAPI/Monitor";

export const fetchGpsData = async (gpsId: string): Promise<VehicleData[]> => {
  const response = await axios.post(
    API_URL,
    {
      MonitorList: {
        Username: "Administrator",
        Password: "adminUST",
        OrganizationCode: "UST",
        Vehiclename: gpsId,
        FleetName: "All",
      },
    },
    {
      headers: {
        Authorization: "kEoemxZTaLsMvHpCrD5H4w==",
        "Content-Type": "application/json",
      },
    }
  );

  // Extract data from the response
  const data = response.data as VehicleData[];

  // Format GPS data
  return data.map((item) => ({
    VEHICLE_ID: item.VEHICLE_ID,
    VEHICLE_LAT: item.VEHICLE_LAT,
    VEHICLE_LONG: item.VEHICLE_LONG,
    VEHICLE_LOCATION: item.VEHICLE_LOCATION,
    VEHICLE_GPS_DATETIME: item.VEHICLE_GPS_DATETIME,
  }));
};
