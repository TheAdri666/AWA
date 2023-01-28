import { Request, Response } from 'express';
import { CustomRequest } from '../authenticateJWT';
import { JwtPayload } from 'jsonwebtoken';

function access(req: Request, res: Response) {
  const token = { ...(req as CustomRequest).token as JwtPayload }
  res.json({ email: token.email });
}

export {
  access
}
