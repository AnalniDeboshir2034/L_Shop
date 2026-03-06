import { promises as fs } from 'fs';

export class FileRepository<T> {
  private readonly filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private async ensureFile(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, '[]', { encoding: 'utf-8' });
    }
  }

  async readAll(): Promise<T[]> {
    await this.ensureFile();
    const content = await fs.readFile(this.filePath, 'utf-8');
    if (content.trim().length === 0) {
      return [];
    }
    const parsed = JSON.parse(content) as unknown;
    if (!Array.isArray(parsed)) {
      throw new Error(`Invalid JSON format in ${this.filePath}`);
    }
    return parsed as T[];
  }

  async writeAll(items: T[]): Promise<void> {
    const json = JSON.stringify(items, null, 2);
    await fs.writeFile(this.filePath, json, { encoding: 'utf-8' });
  }
}

