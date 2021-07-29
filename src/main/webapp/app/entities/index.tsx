import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Customer from './customer';
import Agent from './agent';
import Incident from './incident';
import Notification from './notification';
import Conversation from './conversation';
import Comment from './comment';
import Observation from './observation';
import Attachment from './attachment';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}agent`} component={Agent} />
      <ErrorBoundaryRoute path={`${match.url}incident`} component={Incident} />
      <ErrorBoundaryRoute path={`${match.url}notification`} component={Notification} />
      <ErrorBoundaryRoute path={`${match.url}conversation`} component={Conversation} />
      <ErrorBoundaryRoute path={`${match.url}comment`} component={Comment} />
      <ErrorBoundaryRoute path={`${match.url}observation`} component={Observation} />
      <ErrorBoundaryRoute path={`${match.url}attachment`} component={Attachment} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
