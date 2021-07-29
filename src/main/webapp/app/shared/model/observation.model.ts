import { IAttachment } from 'app/shared/model/attachment.model';
import { IIncident } from 'app/shared/model/incident.model';

export interface IObservation {
  id?: number;
  contents?: string | null;
  attachments?: IAttachment[] | null;
  incident?: IIncident | null;
}

export const defaultValue: Readonly<IObservation> = {};
