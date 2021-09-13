import { File } from '../entities/file.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(File)
export class FileRepository extends Repository<File> {}
