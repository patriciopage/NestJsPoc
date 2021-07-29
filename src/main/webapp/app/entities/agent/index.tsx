import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Agent from './agent';
import AgentDetail from './agent-detail';
import AgentUpdate from './agent-update';
import AgentDeleteDialog from './agent-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AgentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AgentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AgentDetail} />
      <ErrorBoundaryRoute path={match.url} component={Agent} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AgentDeleteDialog} />
  </>
);

export default Routes;
