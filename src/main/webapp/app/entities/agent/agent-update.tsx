import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './agent.reducer';
import { IAgent } from 'app/shared/model/agent.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAgentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AgentUpdate = (props: IAgentUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { agentEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/agent');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...agentEntity,
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
          <h2 id="myApp.agent.home.createOrEditLabel" data-cy="AgentCreateUpdateHeading">
            <Translate contentKey="myApp.agent.home.createOrEditLabel">Create or edit a Agent</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : agentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="agent-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="agent-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="agent-code">
                  <Translate contentKey="myApp.agent.code">Code</Translate>
                </Label>
                <AvField id="agent-code" data-cy="code" type="string" className="form-control" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="agent-firstName">
                  <Translate contentKey="myApp.agent.firstName">First Name</Translate>
                </Label>
                <AvField id="agent-firstName" data-cy="firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="middleNameLabel" for="agent-middleName">
                  <Translate contentKey="myApp.agent.middleName">Middle Name</Translate>
                </Label>
                <AvField id="agent-middleName" data-cy="middleName" type="text" name="middleName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="agent-lastName">
                  <Translate contentKey="myApp.agent.lastName">Last Name</Translate>
                </Label>
                <AvField id="agent-lastName" data-cy="lastName" type="text" name="lastName" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/agent" replace color="info">
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
  agentEntity: storeState.agent.entity,
  loading: storeState.agent.loading,
  updating: storeState.agent.updating,
  updateSuccess: storeState.agent.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AgentUpdate);
