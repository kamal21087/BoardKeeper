import { JwtPayload } from 'jsonwebtoken';

declare namespace Express {
  interface Request {
    user?: JwtPayload; // Allow it to include the payload structure
  }
}
