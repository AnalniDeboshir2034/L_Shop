import { Request, Response, NextFunction } from 'express';
import { SESSION_COOKIE_NAME } from '@config/index';
import { UserRepository } from '@repositories/userRepository';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
 req: AuthenticatedRequest,
 res: Response,
 next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.[SESSION_COOKIE_NAME];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const users = await UserRepository.getAll();
    const user = users.find((u) => u.sessionToken === token);
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    req.userId = user.id;
    next();
  } catch (error) {
    next(error);
  }
};

