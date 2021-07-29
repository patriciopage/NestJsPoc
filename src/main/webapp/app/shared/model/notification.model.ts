import { IIncident } from 'app/shared/model/incident.model';
import { NotificationSource } from 'app/shared/model/enumerations/notification-source.model';

export interface INotification {
  id?: number;
  source?: NotificationSource | null;
  contents?: string | null;
  incident?: IIncident | null;
}

export const defaultValue: Readonly<INotification> = {};
