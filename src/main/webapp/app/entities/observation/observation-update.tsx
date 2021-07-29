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
import { getEntity, updateEntity, createEntity, setBlob, reset } from './observation.reducer';
import { IObservation } from 'app/shared/model/observation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IObservationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ObservationUpdate = (props: IObservationUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { observationEntity, incidents, loading, updating } = props;

  const { contents } = observationEntity;

  const handleClose = () => {
    props.history.push('/observation');
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
        ...observationEntity,
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
          <h2 id="myApp.observation.home.createOrEditLabel" data-cy="ObservationCreateUpdateHeading">
            <Translate contentKey="myApp.observation.home.createOrEditLabel">Create or edit a Observation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : observationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="observation-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="observation-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="contentsLabel" for="observation-contents">
                  <Translate contentKey="myApp.observation.contents">Contents</Translate>
                </Label>
                <AvInput id="observation-contents" data-cy="contents" type="textarea" name="contents" />
              </AvGroup>
              <AvGroup>
                <Label for="observation-incident">
                  <Translate contentKey="myApp.observation.incident">Incident</Translate>
                </Label>
                <AvInput id="observation-incident" data-cy="incident" type="select" className="form-control" name="incidentId">
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
              <Button tag={Link} id="cancel-save" to="/observation" replace color="info">
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
  observationEntity: storeState.observation.entity,
  loading: storeState.observation.loading,
  updating: storeState.observation.updating,
  updateSuccess: storeState.observation.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(ObservationUpdate);
