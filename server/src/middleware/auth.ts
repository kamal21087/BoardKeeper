import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  [key: string]: any; // Add additional fields if your token contains more data
}

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    res.status(401).json({ message: 'Access Token Required' });
    return; // Explicit return after sending the response
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      res.status(403).json({ message: 'Invalid Access Token' });
      return; // Explicit return after sending the response
    }

    // Attach the decoded user data to the request object
    req.user = user as JwtPayload;

    // Proceed to the next middleware or route handler
    next(); // Call next to continue the request lifecycle
  });

  return; // Explicit return for TypeScript's satisfaction
};
