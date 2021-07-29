import { EntityRepository, Repository } from 'typeorm';
import { Attachment } from '../domain/attachment.entity';

@EntityRepository(Attachment)
export class AttachmentRepository extends Repository<Attachment> {}
