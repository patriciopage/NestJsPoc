import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Observation from './observation';
import ObservationDetail from './observation-detail';
import ObservationUpdate from './observation-update';
import ObservationDeleteDialog from './observation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ObservationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ObservationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ObservationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Observation} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ObservationDeleteDialog} />
  </>
);

export default Routes;
