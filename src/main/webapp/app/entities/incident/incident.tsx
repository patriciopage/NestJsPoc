// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './incident.reducer';
import { IIncident } from 'app/shared/model/incident.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIncidentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Incident = (props: IIncidentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { incidentList, match, loading } = props;
  return (
    <div>
      <h2 id="incident-heading" data-cy="IncidentHeading">
        <Translate contentKey="myApp.incident.home.title">Incidents</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="myApp.incident.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="myApp.incident.home.createLabel">Create new Incident</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {incidentList && incidentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="myApp.incident.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myApp.incident.createdAt">Created At</Translate>
                </th>
                <th>
                  <Translate contentKey="myApp.incident.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="myApp.incident.conversation">Conversation</Translate>
                </th>
                <th>
                  <Translate contentKey="myApp.incident.agent">Agent</Translate>
                </th>
                <th>
                  <Translate contentKey="myApp.incident.customer">Customer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {incidentList.map((incident, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${incident.id}`} color="link" size="sm">
                      {incident.id}
                    </Button>
                  </td>
                  <td>{incident.createdAt ? <TextFormat type="date" value={incident.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`myApp.Status.${incident.status}`} />
                  </td>
                  <td>
                    {incident.conversation ? <Link to={`conversation/${incident.conversation.id}`}>{incident.conversation.id}</Link> : ''}
                  </td>
                  <td>{incident.agent ? <Link to={`agent/${incident.agent.id}`}>{incident.agent.id}</Link> : ''}</td>
                  <td>{incident.customer ? <Link to={`customer/${incident.customer.id}`}>{incident.customer.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${incident.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${incident.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${incident.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="myApp.incident.home.notFound">No Incidents found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ incident }: IRootState) => ({
  incidentList: incident.entities,
  loading: incident.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Incident);
