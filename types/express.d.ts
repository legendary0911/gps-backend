import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      isAdmin?: boolean;
      [key: string]: any; // Add more properties as needed
    };
  }
}
