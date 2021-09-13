import { BaseEntity } from 'typeorm';
export declare class file extends BaseEntity {
    id: number;
    name: string;
    action: string;
    module: string;
    sub_module: string;
    child: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
}
