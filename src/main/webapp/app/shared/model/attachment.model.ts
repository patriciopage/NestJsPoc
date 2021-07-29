import { IObservation } from 'app/shared/model/observation.model';

export interface IAttachment {
  id?: number;
  url?: string | null;
  observation?: IObservation | null;
}

export const defaultValue: Readonly<IAttachment> = {};
