import { Request, Response } from 'express';

function accessSecretPath(req: Request, res: Response) {
  if (!req.session.user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  res.status(200).send({ msg: 'Access granted' });
  return;
}

export {
  accessSecretPath,
}
