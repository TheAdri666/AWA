import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.SECRET!);
    (req as CustomRequest).token = decoded;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
};

export {
  CustomRequest,
  authenticateJWT
}
