import { EntityRepository, Repository } from 'typeorm';
import { Observation } from '../domain/observation.entity';

@EntityRepository(Observation)
export class ObservationRepository extends Repository<Observation> {}
