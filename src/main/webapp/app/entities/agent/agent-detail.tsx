import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './agent.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAgentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AgentDetail = (props: IAgentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { agentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="agentDetailsHeading">
          <Translate contentKey="myApp.agent.detail.title">Agent</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{agentEntity.id}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="myApp.agent.code">Code</Translate>
            </span>
          </dt>
          <dd>{agentEntity.code}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="myApp.agent.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{agentEntity.firstName}</dd>
          <dt>
            <span id="middleName">
              <Translate contentKey="myApp.agent.middleName">Middle Name</Translate>
            </span>
          </dt>
          <dd>{agentEntity.middleName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="myApp.agent.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{agentEntity.lastName}</dd>
        </dl>
        <Button tag={Link} to="/agent" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/agent/${agentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ agent }: IRootState) => ({
  agentEntity: agent.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AgentDetail);
