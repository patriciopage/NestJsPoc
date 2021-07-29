import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IConversation } from 'app/shared/model/conversation.model';
import { getEntities as getConversations } from 'app/entities/conversation/conversation.reducer';
import { IAgent } from 'app/shared/model/agent.model';
import { getEntities as getAgents } from 'app/entities/agent/agent.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './incident.reducer';
import { IIncident } from 'app/shared/model/incident.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIncidentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IncidentUpdate = (props: IIncidentUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { incidentEntity, conversations, agents, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/incident');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getConversations();
    props.getAgents();
    props.getCustomers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);

    if (errors.length === 0) {
      const entity = {
        ...incidentEntity,
        ...values,
        conversation: conversations.find(it => it.id.toString() === values.conversationId.toString()),
        agent: agents.find(it => it.id.toString() === values.agentId.toString()),
        customer: customers.find(it => it.id.toString() === values.customerId.toString()),
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
          <h2 id="myApp.incident.home.createOrEditLabel" data-cy="IncidentCreateUpdateHeading">
            <Translate contentKey="myApp.incident.home.createOrEditLabel">Create or edit a Incident</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : incidentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="incident-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="incident-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="createdAtLabel" for="incident-createdAt">
                  <Translate contentKey="myApp.incident.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="incident-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.incidentEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="incident-status">
                  <Translate contentKey="myApp.incident.status">Status</Translate>
                </Label>
                <AvInput
                  id="incident-status"
                  data-cy="status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && incidentEntity.status) || 'OPEN'}
                >
                  <option value="OPEN">{translate('myApp.Status.OPEN')}</option>
                  <option value="CLOSED">{translate('myApp.Status.CLOSED')}</option>
                  <option value="PAUSED">{translate('myApp.Status.PAUSED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="incident-conversation">
                  <Translate contentKey="myApp.incident.conversation">Conversation</Translate>
                </Label>
                <AvInput id="incident-conversation" data-cy="conversation" type="select" className="form-control" name="conversationId">
                  <option value="" key="0" />
                  {conversations
                    ? conversations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="incident-agent">
                  <Translate contentKey="myApp.incident.agent">Agent</Translate>
                </Label>
                <AvInput id="incident-agent" data-cy="agent" type="select" className="form-control" name="agentId">
                  <option value="" key="0" />
                  {agents
                    ? agents.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="incident-customer">
                  <Translate contentKey="myApp.incident.customer">Customer</Translate>
                </Label>
                <AvInput id="incident-customer" data-cy="customer" type="select" className="form-control" name="customerId">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/incident" replace color="info">
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
  conversations: storeState.conversation.entities,
  agents: storeState.agent.entities,
  customers: storeState.customer.entities,
  incidentEntity: storeState.incident.entity,
  loading: storeState.incident.loading,
  updating: storeState.incident.updating,
  updateSuccess: storeState.incident.updateSuccess,
});

const mapDispatchToProps = {
  getConversations,
  getAgents,
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IncidentUpdate);
