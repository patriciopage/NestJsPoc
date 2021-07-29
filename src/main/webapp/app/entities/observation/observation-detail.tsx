import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './observation.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IObservationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ObservationDetail = (props: IObservationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { observationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="observationDetailsHeading">
          <Translate contentKey="myApp.observation.detail.title">Observation</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{observationEntity.id}</dd>
          <dt>
            <span id="contents">
              <Translate contentKey="myApp.observation.contents">Contents</Translate>
            </span>
          </dt>
          <dd>{observationEntity.contents}</dd>
          <dt>
            <Translate contentKey="myApp.observation.incident">Incident</Translate>
          </dt>
          <dd>{observationEntity.incident ? observationEntity.incident.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/observation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/observation/${observationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ observation }: IRootState) => ({
  observationEntity: observation.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ObservationDetail);
