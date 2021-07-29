import { Agent } from '../../domain/agent.entity';
import { AgentDTO } from '../dto/agent.dto';

/**
 * A Agent mapper object.
 */
export class AgentMapper {
    static fromDTOtoEntity(entityDTO: AgentDTO): Agent {
        if (!entityDTO) {
            return;
        }
        const entity = new Agent();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Agent): AgentDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new AgentDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
