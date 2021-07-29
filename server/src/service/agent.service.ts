import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AgentDTO } from '../service/dto/agent.dto';
import { AgentMapper } from '../service/mapper/agent.mapper';
import { AgentRepository } from '../repository/agent.repository';

const relationshipNames = [];

@Injectable()
export class AgentService {
    logger = new Logger('AgentService');

    constructor(@InjectRepository(AgentRepository) private agentRepository: AgentRepository) {}

    async findById(id: string): Promise<AgentDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.agentRepository.findOne(id, options);
        return AgentMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<AgentDTO>): Promise<AgentDTO | undefined> {
        const result = await this.agentRepository.findOne(options);
        return AgentMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<AgentDTO>): Promise<[AgentDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.agentRepository.findAndCount(options);
        const agentDTO: AgentDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(agent => agentDTO.push(AgentMapper.fromEntityToDTO(agent)));
            resultList[0] = agentDTO;
        }
        return resultList;
    }

    async save(agentDTO: AgentDTO): Promise<AgentDTO | undefined> {
        const entity = AgentMapper.fromDTOtoEntity(agentDTO);
        const result = await this.agentRepository.save(entity);
        return AgentMapper.fromEntityToDTO(result);
    }

    async update(agentDTO: AgentDTO): Promise<AgentDTO | undefined> {
        const entity = AgentMapper.fromDTOtoEntity(agentDTO);
        const result = await this.agentRepository.save(entity);
        return AgentMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.agentRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
