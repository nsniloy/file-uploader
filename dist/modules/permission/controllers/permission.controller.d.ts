import { PermissionService } from '../services';
import { CreatePermissionDto } from '../dto/create-permission.dto';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    create(createPermissionDto: CreatePermissionDto): Promise<import("../entities/definitions/permission.interface").IPermission & import("../entities/permission.entity").Permission>;
    findAll(): Promise<import("../entities/permission.entity").Permission[]>;
    remove(id: number): Promise<void>;
}
