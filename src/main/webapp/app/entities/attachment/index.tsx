import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Attachment from './attachment';
import AttachmentDetail from './attachment-detail';
import AttachmentUpdate from './attachment-update';
import AttachmentDeleteDialog from './attachment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AttachmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AttachmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AttachmentDetail} />
      <ErrorBoundaryRoute path={match.url} component={Attachment} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AttachmentDeleteDialog} />
  </>
);

export default Routes;
