import { FileRepository } from '@utils/fileRepository';
import { User } from '@types/domain';
import { USERS_FILE } from '@config/index';

const repo = new FileRepository<User>(USERS_FILE);

export const UserRepository = {
  async getAll(): Promise<User[]> {
    return repo.readAll();
  },

  async saveAll(users: User[]): Promise<void> {
    await repo.writeAll(users);
  },

  async findById(id: string): Promise<User | undefined> {
    const users = await repo.readAll();
    return users.find((u) => u.id === id);
  },

  async findByEmailOrLogin(value: string): Promise<User | undefined> {
    const users = await repo.readAll();
    return users.find((u) => u.email === value || u.login === value);
  },

  async upsert(user: User): Promise<User> {
    const users = await repo.readAll();
    const index = users.findIndex((u) => u.id === user.id);
    if (index === -1) {
      users.push(user);
    } else {
      users[index] = user;
    }
    await repo.writeAll(users);
    return user;
  }
};

