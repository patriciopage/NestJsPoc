import { Attachment } from '../../domain/attachment.entity';
import { AttachmentDTO } from '../dto/attachment.dto';

/**
 * A Attachment mapper object.
 */
export class AttachmentMapper {
    static fromDTOtoEntity(entityDTO: AttachmentDTO): Attachment {
        if (!entityDTO) {
            return;
        }
        const entity = new Attachment();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Attachment): AttachmentDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new AttachmentDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
