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
import { getEntity, updateEntity, createEntity, setBlob, reset } from './conversation.reducer';
import { IConversation } from 'app/shared/model/conversation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IConversationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ConversationUpdate = (props: IConversationUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { conversationEntity, incidents, loading, updating } = props;

  const { contents } = conversationEntity;

  const handleClose = () => {
    props.history.push('/conversation');
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
        ...conversationEntity,
        ...values,
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
          <h2 id="myApp.conversation.home.createOrEditLabel" data-cy="ConversationCreateUpdateHeading">
            <Translate contentKey="myApp.conversation.home.createOrEditLabel">Create or edit a Conversation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : conversationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="conversation-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="conversation-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="contentsLabel" for="conversation-contents">
                  <Translate contentKey="myApp.conversation.contents">Contents</Translate>
                </Label>
                <AvInput id="conversation-contents" data-cy="contents" type="textarea" name="contents" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/conversation" replace color="info">
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
  conversationEntity: storeState.conversation.entity,
  loading: storeState.conversation.loading,
  updating: storeState.conversation.updating,
  updateSuccess: storeState.conversation.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(ConversationUpdate);
