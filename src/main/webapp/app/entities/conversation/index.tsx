import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Conversation from './conversation';
import ConversationDetail from './conversation-detail';
import ConversationUpdate from './conversation-update';
import ConversationDeleteDialog from './conversation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConversationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConversationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConversationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Conversation} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ConversationDeleteDialog} />
  </>
);

export default Routes;
