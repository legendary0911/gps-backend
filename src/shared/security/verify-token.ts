import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecretKey"
    );

    // Extend the Request object to include user
    (req as any).user = decoded; // Or cast as `any` to avoid type errors

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default validateToken;
