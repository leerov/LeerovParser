import { IConfiguration } from "@/components/Interfaces/IConfiguration";
import { promises as fs } from "fs";
import path from "path";

export class ConfigManager {
  private filePath: string;

  constructor(fileName: string = "configs.json") {
    this.filePath = path.resolve(process.cwd(), fileName);
  }

  private async ensureFileExists(): Promise<void> {
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, "[]", "utf-8");
    }
  }

  private async readConfigs(): Promise<IConfiguration[]> {
    await this.ensureFileExists();
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return data.trim() ? JSON.parse(data) : [];
    } catch (error: any) {
      console.error("Ошибка чтения файла конфигурации:", error);
      await fs.writeFile(this.filePath, "[]", "utf-8");
      return [];
    }
  }

  private async writeConfigs(configs: IConfiguration[]): Promise<void> {
    const data = JSON.stringify(configs, null, 2);
    await fs.writeFile(this.filePath, data, "utf-8");
  }

  public async getAllConfigs(): Promise<IConfiguration[]> {
    return this.readConfigs();
  }

  public async getConfigById(id: number): Promise<IConfiguration | undefined> {
    const configs = await this.readConfigs();
    return configs.find((config) => config.id === id);
  }

  public async addConfig(newConfig: IConfiguration): Promise<void> {
    const configs = await this.readConfigs();
    if (configs.find((config) => config.id === newConfig.id)) {
      throw new Error(`Конфигурация с id ${newConfig.id} уже существует!`);
    }
    configs.push(newConfig);
    await this.writeConfigs(configs);
  }

  public async updateConfig(updatedConfig: IConfiguration): Promise<void> {
    const configs = await this.readConfigs();
    const index = configs.findIndex((config) => config.id === updatedConfig.id);
    if (index === -1) {
      throw new Error(`Конфигурация с id ${updatedConfig.id} не найдена!`);
    }
    configs[index] = updatedConfig;
    await this.writeConfigs(configs);
  }

  public async removeConfig(id: number): Promise<void> {
    const configs = await this.readConfigs();
    const newConfigs = configs.filter((config) => config.id !== id);
    if (newConfigs.length === configs.length) {
      throw new Error(`Конфигурация с id ${id} не найдена!`);
    }
    await this.writeConfigs(newConfigs);
  }
}
