import { Conversation } from '../../domain/conversation.entity';
import { ConversationDTO } from '../dto/conversation.dto';

/**
 * A Conversation mapper object.
 */
export class ConversationMapper {
    static fromDTOtoEntity(entityDTO: ConversationDTO): Conversation {
        if (!entityDTO) {
            return;
        }
        const entity = new Conversation();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Conversation): ConversationDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new ConversationDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
