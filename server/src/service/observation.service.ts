import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ObservationDTO } from '../service/dto/observation.dto';
import { ObservationMapper } from '../service/mapper/observation.mapper';
import { ObservationRepository } from '../repository/observation.repository';

const relationshipNames = [];
relationshipNames.push('incident');

@Injectable()
export class ObservationService {
    logger = new Logger('ObservationService');

    constructor(@InjectRepository(ObservationRepository) private observationRepository: ObservationRepository) {}

    async findById(id: string): Promise<ObservationDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.observationRepository.findOne(id, options);
        return ObservationMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<ObservationDTO>): Promise<ObservationDTO | undefined> {
        const result = await this.observationRepository.findOne(options);
        return ObservationMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<ObservationDTO>): Promise<[ObservationDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.observationRepository.findAndCount(options);
        const observationDTO: ObservationDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(observation => observationDTO.push(ObservationMapper.fromEntityToDTO(observation)));
            resultList[0] = observationDTO;
        }
        return resultList;
    }

    async save(observationDTO: ObservationDTO): Promise<ObservationDTO | undefined> {
        const entity = ObservationMapper.fromDTOtoEntity(observationDTO);
        const result = await this.observationRepository.save(entity);
        return ObservationMapper.fromEntityToDTO(result);
    }

    async update(observationDTO: ObservationDTO): Promise<ObservationDTO | undefined> {
        const entity = ObservationMapper.fromDTOtoEntity(observationDTO);
        const result = await this.observationRepository.save(entity);
        return ObservationMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.observationRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
