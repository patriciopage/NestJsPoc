import { Notification } from '../../domain/notification.entity';
import { NotificationDTO } from '../dto/notification.dto';

/**
 * A Notification mapper object.
 */
export class NotificationMapper {
    static fromDTOtoEntity(entityDTO: NotificationDTO): Notification {
        if (!entityDTO) {
            return;
        }
        const entity = new Notification();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Notification): NotificationDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new NotificationDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
