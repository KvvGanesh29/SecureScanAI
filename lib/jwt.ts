import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_in_production';
const JWT_EXPIRE: string | number = process.env.JWT_EXPIRE || '7d';

export function generateToken(userId: string) {
  const options: SignOptions = { expiresIn: JWT_EXPIRE };
  return jwt.sign({ userId }, JWT_SECRET, options);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
}

export function decodeToken(token: string) {
  try {
    return jwt.decode(token) as { userId: string; iat: number; exp: number } | null;
  } catch (error) {
    return null;
  }
}
