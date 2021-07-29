import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { setFileData, byteSize, Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIncident } from 'app/shared/model/incident.model';
import { getEntities as getIncidents } from 'app/entities/incident/incident.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './notification.reducer';
import { INotification } from 'app/shared/model/notification.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INotificationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NotificationUpdate = (props: INotificationUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { notificationEntity, incidents, loading, updating } = props;

  const { contents } = notificationEntity;

  const handleClose = () => {
    props.history.push('/notification');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getIncidents();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...notificationEntity,
        ...values,
        incident: incidents.find(it => it.id.toString() === values.incidentId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="myApp.notification.home.createOrEditLabel" data-cy="NotificationCreateUpdateHeading">
            <Translate contentKey="myApp.notification.home.createOrEditLabel">Create or edit a Notification</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : notificationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="notification-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="notification-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="sourceLabel" for="notification-source">
                  <Translate contentKey="myApp.notification.source">Source</Translate>
                </Label>
                <AvInput
                  id="notification-source"
                  data-cy="source"
                  type="select"
                  className="form-control"
                  name="source"
                  value={(!isNew && notificationEntity.source) || 'TWITTER'}
                >
                  <option value="TWITTER">{translate('myApp.NotificationSource.TWITTER')}</option>
                  <option value="FACEBOOK">{translate('myApp.NotificationSource.FACEBOOK')}</option>
                  <option value="INSTAGRAM">{translate('myApp.NotificationSource.INSTAGRAM')}</option>
                  <option value="EMAIL">{translate('myApp.NotificationSource.EMAIL')}</option>
                  <option value="WEBPAGE">{translate('myApp.NotificationSource.WEBPAGE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="contentsLabel" for="notification-contents">
                  <Translate contentKey="myApp.notification.contents">Contents</Translate>
                </Label>
                <AvInput id="notification-contents" data-cy="contents" type="textarea" name="contents" />
              </AvGroup>
              <AvGroup>
                <Label for="notification-incident">
                  <Translate contentKey="myApp.notification.incident">Incident</Translate>
                </Label>
                <AvInput id="notification-incident" data-cy="incident" type="select" className="form-control" name="incidentId">
                  <option value="" key="0" />
                  {incidents
                    ? incidents.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/notification" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  incidents: storeState.incident.entities,
  notificationEntity: storeState.notification.entity,
  loading: storeState.notification.loading,
  updating: storeState.notification.updating,
  updateSuccess: storeState.notification.updateSuccess,
});

const mapDispatchToProps = {
  getIncidents,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NotificationUpdate);
