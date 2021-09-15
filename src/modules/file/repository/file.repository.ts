import { File } from '../entities/file.entity';
import { EntityRepository, Repository } from 'typeorm';
import { StatusType } from '@common/enums/status.enum';

@EntityRepository(File)
export class FileRepository extends Repository<File> {
    async findByPublicKey(publicKey: string){
        return await this.find({
            publicKey,
            status: StatusType.Active
        })
    }

    async findByPrivateKey(privateKey: string){
        return await this.find({
            privateKey,
            status: StatusType.Active
        })
    }
}
