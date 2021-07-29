import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ConversationDTO } from '../service/dto/conversation.dto';
import { ConversationMapper } from '../service/mapper/conversation.mapper';
import { ConversationRepository } from '../repository/conversation.repository';

const relationshipNames = [];

@Injectable()
export class ConversationService {
    logger = new Logger('ConversationService');

    constructor(@InjectRepository(ConversationRepository) private conversationRepository: ConversationRepository) {}

    async findById(id: string): Promise<ConversationDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.conversationRepository.findOne(id, options);
        return ConversationMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<ConversationDTO>): Promise<ConversationDTO | undefined> {
        const result = await this.conversationRepository.findOne(options);
        return ConversationMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ConversationDTO>): Promise<[ConversationDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.conversationRepository.findAndCount(options);
        const conversationDTO: ConversationDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(conversation =>
                conversationDTO.push(ConversationMapper.fromEntityToDTO(conversation)),
            );
            resultList[0] = conversationDTO;
        }
        return resultList;
    }

    async save(conversationDTO: ConversationDTO): Promise<ConversationDTO | undefined> {
        const entity = ConversationMapper.fromDTOtoEntity(conversationDTO);
        const result = await this.conversationRepository.save(entity);
        return ConversationMapper.fromEntityToDTO(result);
    }

    async update(conversationDTO: ConversationDTO): Promise<ConversationDTO | undefined> {
        const entity = ConversationMapper.fromDTOtoEntity(conversationDTO);
        const result = await this.conversationRepository.save(entity);
        return ConversationMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.conversationRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
