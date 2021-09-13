import { IPermission } from '../entities/definitions/permission.interface';
import { PermissionRepository } from '../repository/permission.repository';
export declare class PermissionService {
    private repository;
    constructor(repository: PermissionRepository);
    create(createPermissionDto: IPermission): Promise<IPermission & import("../entities/permission.entity").Permission>;
    findAll(): Promise<import("../entities/permission.entity").Permission[]>;
    remove(id: number): Promise<void>;
}
