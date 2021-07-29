import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AttachmentDTO } from '../service/dto/attachment.dto';
import { AttachmentMapper } from '../service/mapper/attachment.mapper';
import { AttachmentRepository } from '../repository/attachment.repository';

const relationshipNames = [];
relationshipNames.push('observation');

@Injectable()
export class AttachmentService {
    logger = new Logger('AttachmentService');

    constructor(@InjectRepository(AttachmentRepository) private attachmentRepository: AttachmentRepository) {}

    async findById(id: string): Promise<AttachmentDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.attachmentRepository.findOne(id, options);
        return AttachmentMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<AttachmentDTO>): Promise<AttachmentDTO | undefined> {
        const result = await this.attachmentRepository.findOne(options);
        return AttachmentMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<AttachmentDTO>): Promise<[AttachmentDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.attachmentRepository.findAndCount(options);
        const attachmentDTO: AttachmentDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(attachment => attachmentDTO.push(AttachmentMapper.fromEntityToDTO(attachment)));
            resultList[0] = attachmentDTO;
        }
        return resultList;
    }

    async save(attachmentDTO: AttachmentDTO): Promise<AttachmentDTO | undefined> {
        const entity = AttachmentMapper.fromDTOtoEntity(attachmentDTO);
        const result = await this.attachmentRepository.save(entity);
        return AttachmentMapper.fromEntityToDTO(result);
    }

    async update(attachmentDTO: AttachmentDTO): Promise<AttachmentDTO | undefined> {
        const entity = AttachmentMapper.fromDTOtoEntity(attachmentDTO);
        const result = await this.attachmentRepository.save(entity);
        return AttachmentMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.attachmentRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
