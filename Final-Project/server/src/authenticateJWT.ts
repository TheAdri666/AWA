import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET!) as JwtPayload;
    req.userId = decoded.userId;  
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export {
  authenticateJWT,
  AuthenticatedRequest
}
