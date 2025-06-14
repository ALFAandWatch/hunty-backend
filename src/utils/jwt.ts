import jwt, { SignOptions } from 'jsonwebtoken';

// Asegúrate de que la variable sea obligatoriamente string
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const signOptions: SignOptions = {
   expiresIn: JWT_EXPIRES_IN as unknown as number,
};

export const generateToken = (payload: object): string => {
   return jwt.sign(payload, JWT_SECRET, signOptions);
};

export const verifyToken = (token: string): any => {
   return jwt.verify(token, JWT_SECRET);
};
