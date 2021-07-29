import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { NotificationDTO } from '../service/dto/notification.dto';
import { NotificationMapper } from '../service/mapper/notification.mapper';
import { NotificationRepository } from '../repository/notification.repository';

const relationshipNames = [];
relationshipNames.push('incident');

@Injectable()
export class NotificationService {
    logger = new Logger('NotificationService');

    constructor(@InjectRepository(NotificationRepository) private notificationRepository: NotificationRepository) {}

    async findById(id: string): Promise<NotificationDTO | undefined> {
        const options = { relations: relationshipNames };
        const result = await this.notificationRepository.findOne(id, options);
        return NotificationMapper.fromEntityToDTO(result);
    }

    async findByfields(options: FindOneOptions<NotificationDTO>): Promise<NotificationDTO | undefined> {
        const result = await this.notificationRepository.findOne(options);
        return NotificationMapper.fromEntityToDTO(result);
    }

    async findAndCount(options: FindManyOptions<NotificationDTO>): Promise<[NotificationDTO[], number]> {
        options.relations = relationshipNames;
        const resultList = await this.notificationRepository.findAndCount(options);
        const notificationDTO: NotificationDTO[] = [];
        if (resultList && resultList[0]) {
            resultList[0].forEach(notification =>
                notificationDTO.push(NotificationMapper.fromEntityToDTO(notification)),
            );
            resultList[0] = notificationDTO;
        }
        return resultList;
    }

    async save(notificationDTO: NotificationDTO): Promise<NotificationDTO | undefined> {
        const entity = NotificationMapper.fromDTOtoEntity(notificationDTO);
        const result = await this.notificationRepository.save(entity);
        return NotificationMapper.fromEntityToDTO(result);
    }

    async update(notificationDTO: NotificationDTO): Promise<NotificationDTO | undefined> {
        const entity = NotificationMapper.fromDTOtoEntity(notificationDTO);
        const result = await this.notificationRepository.save(entity);
        return NotificationMapper.fromEntityToDTO(result);
    }

    async deleteById(id: string): Promise<void | undefined> {
        await this.notificationRepository.delete(id);
        const entityFind = await this.findById(id);
        if (entityFind) {
            throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
        }
        return;
    }
}
