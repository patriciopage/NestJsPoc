import { Observation } from '../../domain/observation.entity';
import { ObservationDTO } from '../dto/observation.dto';

/**
 * A Observation mapper object.
 */
export class ObservationMapper {
    static fromDTOtoEntity(entityDTO: ObservationDTO): Observation {
        if (!entityDTO) {
            return;
        }
        const entity = new Observation();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Observation): ObservationDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new ObservationDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
