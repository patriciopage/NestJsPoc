import { IIncident } from 'app/shared/model/incident.model';

export interface IAgent {
  id?: number;
  code?: number | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  incidents?: IIncident[] | null;
}

export const defaultValue: Readonly<IAgent> = {};
