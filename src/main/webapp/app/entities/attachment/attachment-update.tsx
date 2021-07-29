import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IObservation } from 'app/shared/model/observation.model';
import { getEntities as getObservations } from 'app/entities/observation/observation.reducer';
import { getEntity, updateEntity, createEntity, reset } from './attachment.reducer';
import { IAttachment } from 'app/shared/model/attachment.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAttachmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AttachmentUpdate = (props: IAttachmentUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { attachmentEntity, observations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/attachment');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getObservations();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...attachmentEntity,
        ...values,
        observation: observations.find(it => it.id.toString() === values.observationId.toString()),
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
          <h2 id="myApp.attachment.home.createOrEditLabel" data-cy="AttachmentCreateUpdateHeading">
            <Translate contentKey="myApp.attachment.home.createOrEditLabel">Create or edit a Attachment</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : attachmentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="attachment-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="attachment-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="urlLabel" for="attachment-url">
                  <Translate contentKey="myApp.attachment.url">Url</Translate>
                </Label>
                <AvField id="attachment-url" data-cy="url" type="text" name="url" />
              </AvGroup>
              <AvGroup>
                <Label for="attachment-observation">
                  <Translate contentKey="myApp.attachment.observation">Observation</Translate>
                </Label>
                <AvInput id="attachment-observation" data-cy="observation" type="select" className="form-control" name="observationId">
                  <option value="" key="0" />
                  {observations
                    ? observations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/attachment" replace color="info">
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
  observations: storeState.observation.entities,
  attachmentEntity: storeState.attachment.entity,
  loading: storeState.attachment.loading,
  updating: storeState.attachment.updating,
  updateSuccess: storeState.attachment.updateSuccess,
});

const mapDispatchToProps = {
  getObservations,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentUpdate);
