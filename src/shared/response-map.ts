import { Request, Response } from "express";

export const success = (req: Request, res: Response, data: any) => {
  res.status(200).json({ success: true, data });
};

export const error = (req: Request, res: Response, message: string) => {
  res.status(500).json({ success: false, message });
};
