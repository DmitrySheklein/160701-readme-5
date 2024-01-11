import { randomUUID } from 'crypto';
import { Entity, EntityIdType } from './entity.interface';
import { Repository } from './repository.interface';

export abstract class BaseMemoryRepository<T extends Entity<EntityIdType>>
  implements Repository<T>
{
  protected readonly entities: Map<T['id'], T> = new Map();

  public async findAll(): Promise<T[]> {
    return Array.from(this.entities.values());
  }

  public async findById(id: T['id']): Promise<T | null> {
    return this.entities.get(id) || null;
  }

  public async save(entity: T): Promise<T> {
    if (!entity.id) {
      entity.id = randomUUID();
    }

    this.entities.set(entity.id, entity);

    return entity;
  }

  public async update(id: T['id'], entity: T): Promise<T> {
    if (!this.entities.has(id)) {
      throw new Error(`Entity with id ${id} does not exist`);
    }
    entity.id = id;
    this.entities.set(id, entity);

    return entity;
  }

  public async deleteById(id: T['id']): Promise<void> {
    this.entities.delete(id);
  }
}
