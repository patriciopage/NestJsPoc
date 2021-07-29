import { IComment } from 'app/shared/model/comment.model';
import { IIncident } from 'app/shared/model/incident.model';

export interface IConversation {
  id?: number;
  contents?: string | null;
  comments?: IComment[] | null;
  incident?: IIncident | null;
}

export const defaultValue: Readonly<IConversation> = {};
