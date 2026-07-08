import { DatabaseService } from './database.service';

export abstract class BaseRepository<T, CreateDto, UpdateDto> {
  constructor(
    public readonly db: DatabaseService,
    protected readonly model: any,
  ) {}

  async create(data: CreateDto): Promise<T> {
    return this.model.create({ data });
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async findMany(where: any = {}, options: any = {}): Promise<T[]> {
    return this.model.findMany({
      where: { ...where, deletedAt: null },
      ...options,
    });
  }

  async update(id: string, data: UpdateDto): Promise<T> {
    return this.model.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<T> {
    return this.model.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async restore(id: string): Promise<T> {
    return this.model.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  async hardDelete(id: string): Promise<T> {
    return this.model.delete({
      where: { id },
    });
  }
}
