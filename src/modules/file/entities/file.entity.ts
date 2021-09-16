import { StatusType, StorageProviderType } from '../../../common/enums';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String
  })
  name: string;

  @Column({
    type: String
  })
  location: string;

  @Column({
    type: String,
    default: StorageProviderType.Local
  })
  provider: StorageProviderType;

  @Column({
    type: String
  })
  @Index()
  publicKey: string;

  @Column({
    type: String
  })
  @Index()
  privateKey: string;

  @Column({
    type: String,
    default: StatusType.Active
  })
  @Index()
  status: StatusType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
