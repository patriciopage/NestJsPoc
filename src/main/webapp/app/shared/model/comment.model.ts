import { IConversation } from 'app/shared/model/conversation.model';

export interface IComment {
  id?: number;
  contents?: string | null;
  conversation?: IConversation | null;
}

export const defaultValue: Readonly<IComment> = {};
