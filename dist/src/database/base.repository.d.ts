import { DatabaseService } from './database.service';
export declare abstract class BaseRepository<T, CreateDto, UpdateDto> {
    readonly db: DatabaseService;
    protected readonly model: any;
    constructor(db: DatabaseService, model: any);
    create(data: CreateDto): Promise<T>;
    findById(id: string): Promise<T | null>;
    findMany(where?: any, options?: any): Promise<T[]>;
    update(id: string, data: UpdateDto): Promise<T>;
    softDelete(id: string): Promise<T>;
    restore(id: string): Promise<T>;
    hardDelete(id: string): Promise<T>;
}
