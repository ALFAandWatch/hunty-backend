import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No autorizado' });
   }

   const token = authHeader.split(' ')[1];

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
      req.user = decoded;
      next();
   } catch (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
   }
};
