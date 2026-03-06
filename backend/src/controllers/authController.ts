import { Request, Response, NextFunction } from 'express';
import { SESSION_COOKIE_NAME, SESSION_TTL_MS } from '@config/index';
import { AuthService } from '@services/authService';
import { RegisterRequest, LoginRequest } from '@types/domain';
import { UserRepository } from '@repositories/userRepository';

const mapUser = (user: { id: string; name: string; email: string; login: string; phone: string }) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  login: user.login,
  phone: user.phone
});

export const AuthController = {
  async register(req: Request<unknown, unknown, RegisterRequest>, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body);
      res.cookie(SESSION_COOKIE_NAME, user.sessionToken, {
        httpOnly: true,
        maxAge: SESSION_TTL_MS,
        sameSite: 'lax'
      });
      res.status(201).json(mapUser(user));
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request<unknown, unknown, LoginRequest>, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.login(req.body);
      res.cookie(SESSION_COOKIE_NAME, user.sessionToken, {
        httpOnly: true,
        maxAge: SESSION_TTL_MS,
        sameSite: 'lax'
      });
      res.status(200).json(mapUser(user));
    } catch (error) {
      next(error);
    }
  },

  async me(req: Request, res: Response, next: NextFunction) {
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
      res.status(200).json(mapUser(user));
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie(SESSION_COOKIE_NAME);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

