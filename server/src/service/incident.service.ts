import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { IncidentDTO } from '../service/dto/incident.dto';
import { IncidentMapper } from '../service/mapper/incident.mapper';
import { IncidentRepository } from '../repository/incident.repository';

const relationshipNames = [];
relationshipNames.push('agent');
relationshipNames.push('customer');

@Injectable()
export class IncidentService {
    logger = new Logger('IncidentService');

    constructor(@InjectRepository(IncidentRepository) private incidentRepository: IncidentRepository) {}

    async findById(id: string): Promise<IncidentDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.incidentRepository.findOne(id, options);
        return IncidentMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<IncidentDTO>): Promise<IncidentDTO | undefined> {
        const result = await this.incidentRepository.findOne(options);
        return IncidentMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<IncidentDTO>): Promise<[IncidentDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.incidentRepository.findAndCount(options);
        const incidentDTO: IncidentDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(incident => incidentDTO.push(IncidentMapper.fromEntityToDTO(incident)));
            resultList[0] = incidentDTO;
        }
        return resultList;
    }

    async save(incidentDTO: IncidentDTO): Promise<IncidentDTO | undefined> {
        const entity = IncidentMapper.fromDTOtoEntity(incidentDTO);
        const result = await this.incidentRepository.save(entity);
        return IncidentMapper.fromEntityToDTO(result);
    }

    async update(incidentDTO: IncidentDTO): Promise<IncidentDTO | undefined> {
        const entity = IncidentMapper.fromDTOtoEntity(incidentDTO);
        const result = await this.incidentRepository.save(entity);
        return IncidentMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.incidentRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
