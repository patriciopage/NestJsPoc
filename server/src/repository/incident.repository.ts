import { EntityRepository, Repository } from 'typeorm';
import { Incident } from '../domain/incident.entity';

@EntityRepository(Incident)
export class IncidentRepository extends Repository<Incident> {}
