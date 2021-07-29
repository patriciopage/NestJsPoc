import { Incident } from '../../domain/incident.entity';
import { IncidentDTO } from '../dto/incident.dto';

/**
 * A Incident mapper object.
 */
export class IncidentMapper {
    static fromDTOtoEntity(entityDTO: IncidentDTO): Incident {
        if (!entityDTO) {
            return;
        }
        const entity = new Incident();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Incident): IncidentDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new IncidentDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
