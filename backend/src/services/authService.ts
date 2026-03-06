import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { User, RegisterRequest, LoginRequest } from '@types/domain';
import { UserRepository } from '@repositories/userRepository';

export const AuthService = {
  async register(payload: RegisterRequest): Promise<User> {
    const existing = await UserRepository.findByEmailOrLogin(payload.email);
    if (existing) {
      const error = new Error('User with this email already exists');
      (error as Error & { statusCode?: number }).statusCode = 400;
      throw error;
    }

    const existingByLogin = await UserRepository.findByEmailOrLogin(payload.login);
    if (existingByLogin) {
      const error = new Error('User with this login already exists');
      (error as Error & { statusCode?: number }).statusCode = 400;
      throw error;
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    const now = new Date().toISOString();

    const user: User = {
      id: uuidv4(),
      name: payload.name,
      email: payload.email,
      login: payload.login,
      phone: payload.phone,
      passwordHash,
      createdAt: now
    };

    const sessionToken = uuidv4();
    const userWithSession: User = { ...user, sessionToken };

    await UserRepository.upsert(userWithSession);
    return userWithSession;
  },

  async login(payload: LoginRequest): Promise<User> {
    const user = await UserRepository.findByEmailOrLogin(payload.loginOrEmail);
    if (!user) {
      const error = new Error('Invalid credentials');
      (error as Error & { statusCode?: number }).statusCode = 401;
      throw error;
    }

    const isValid = await bcrypt.compare(payload.password, user.passwordHash);
    if (!isValid) {
      const error = new Error('Invalid credentials');
      (error as Error & { statusCode?: number }).statusCode = 401;
      throw error;
    }

    const sessionToken = uuidv4();
    const updatedUser: User = { ...user, sessionToken };
    await UserRepository.upsert(updatedUser);
    return updatedUser;
  }
};

