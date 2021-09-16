import { File } from '../entities/file.entity';
import { EntityRepository, LessThan, Repository } from 'typeorm';
import { StatusType } from '../../../common/enums';

@EntityRepository(File)
export class FileRepository extends Repository<File> {
    async findByPublicKey(publicKey: string) {
        return await this.find({
            publicKey,
            status: StatusType.Active
        })
    }

    async findByPrivateKey(privateKey: string) {
        return await this.find({
            privateKey,
            status: StatusType.Active
        })
    }

    async findExpired(date: Date) {
        return await this.find({
            where: {
                status: StatusType.Active,
                createdAt: LessThan(date)
            },
        })
    }
}
