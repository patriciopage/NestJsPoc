import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import agent, {
  AgentState
} from 'app/entities/agent/agent.reducer';
// prettier-ignore
import incident, {
  IncidentState
} from 'app/entities/incident/incident.reducer';
// prettier-ignore
import notification, {
  NotificationState
} from 'app/entities/notification/notification.reducer';
// prettier-ignore
import conversation, {
  ConversationState
} from 'app/entities/conversation/conversation.reducer';
// prettier-ignore
import comment, {
  CommentState
} from 'app/entities/comment/comment.reducer';
// prettier-ignore
import observation, {
  ObservationState
} from 'app/entities/observation/observation.reducer';
// prettier-ignore
import attachment, {
  AttachmentState
} from 'app/entities/attachment/attachment.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly customer: CustomerState;
  readonly agent: AgentState;
  readonly incident: IncidentState;
  readonly notification: NotificationState;
  readonly conversation: ConversationState;
  readonly comment: CommentState;
  readonly observation: ObservationState;
  readonly attachment: AttachmentState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  customer,
  agent,
  incident,
  notification,
  conversation,
  comment,
  observation,
  attachment,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
