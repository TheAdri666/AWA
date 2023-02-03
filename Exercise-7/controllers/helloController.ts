import { Request, Response } from 'express';

function helloWorld(req: Request, res: Response): void {
  res.status(200).send('Hello World');
}

export { helloWorld };