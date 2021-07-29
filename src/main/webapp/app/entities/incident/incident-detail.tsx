import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './incident.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIncidentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IncidentDetail = (props: IIncidentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { incidentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="incidentDetailsHeading">
          <Translate contentKey="myApp.incident.detail.title">Incident</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{incidentEntity.id}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="myApp.incident.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{incidentEntity.createdAt ? <TextFormat value={incidentEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="myApp.incident.status">Status</Translate>
            </span>
          </dt>
          <dd>{incidentEntity.status}</dd>
          <dt>
            <Translate contentKey="myApp.incident.conversation">Conversation</Translate>
          </dt>
          <dd>{incidentEntity.conversation ? incidentEntity.conversation.id : ''}</dd>
          <dt>
            <Translate contentKey="myApp.incident.agent">Agent</Translate>
          </dt>
          <dd>{incidentEntity.agent ? incidentEntity.agent.id : ''}</dd>
          <dt>
            <Translate contentKey="myApp.incident.customer">Customer</Translate>
          </dt>
          <dd>{incidentEntity.customer ? incidentEntity.customer.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/incident" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/incident/${incidentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ incident }: IRootState) => ({
  incidentEntity: incident.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetail);
