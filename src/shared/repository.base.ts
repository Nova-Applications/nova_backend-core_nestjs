import { CosmosDBClient } from './database/cosmos/cosmos-db.client';
import { ItemDefinition } from '@azure/cosmos';

export abstract class BaseRepository<T> {
  private readonly _cosmos: CosmosDBClient;

  constructor(
    protected readonly endpoint: string,
    protected readonly apiKey: string,
    protected readonly databaseId: string,
    protected readonly containerId: string,
  ) {
    this._cosmos = new CosmosDBClient(
      endpoint,
      apiKey,
      databaseId,
      containerId,
    );
  }

  async query(query: string): Promise<T> {
    const result = await this._cosmos.query(query);
    return result as unknown as Promise<T>;
  }

  async fetchAll(): Promise<ItemDefinition[]> {
    const result = await this._cosmos.fetchAll();
    return result as ItemDefinition[];
  }

  async getById(documentId: any): Promise<T> {
    const result = await this._cosmos.getById(documentId);
    return result as Promise<T>;
  }

  async create(document: any): Promise<T> {
    const result = await this._cosmos.create(document);
    return result as Promise<T>;
  }

  async update(documentId: any, document: any): Promise<T> {
    const result = await this._cosmos.update(documentId, document);
    return result as Promise<T>;
  }

  async delete(documentId: any): Promise<T> {
    const result = await this._cosmos.delete(documentId);
    return result as Promise<T>;
  }
}
