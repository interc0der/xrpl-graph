import express, { Express, Request, Response, NextFunction } from 'express';

const ping = async (req: Request, res: Response, next: NextFunction) => {
  res.json('pong');
};

export default { ping };
