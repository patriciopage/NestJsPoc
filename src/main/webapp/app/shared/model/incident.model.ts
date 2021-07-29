import dayjs from 'dayjs';
import { IConversation } from 'app/shared/model/conversation.model';
import { IObservation } from 'app/shared/model/observation.model';
import { INotification } from 'app/shared/model/notification.model';
import { IAgent } from 'app/shared/model/agent.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IIncident {
  id?: number;
  createdAt?: string | null;
  status?: Status | null;
  conversation?: IConversation | null;
  observations?: IObservation[] | null;
  notifications?: INotification[] | null;
  agent?: IAgent | null;
  customer?: ICustomer | null;
}

export const defaultValue: Readonly<IIncident> = {};
