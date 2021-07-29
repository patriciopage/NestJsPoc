// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './agent.reducer';
import { IAgent } from 'app/shared/model/agent.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAgentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Agent = (props: IAgentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { agentList, match, loading } = props;
  return (
    <div>
      <h2 id="agent-heading" data-cy="AgentHeading">
        <Translate contentKey="myApp.agent.home.title">Agents</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="myApp.agent.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="myApp.agent.home.createLabel">Create new Agent</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {agentList && agentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="myApp.agent.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="myApp.agent.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="myApp.agent.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="myApp.agent.middleName">Middle Name</Translate>
                </th>
                <th>
                  <Translate contentKey="myApp.agent.lastName">Last Name</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {agentList.map((agent, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${agent.id}`} color="link" size="sm">
                      {agent.id}
                    </Button>
                  </td>
                  <td>{agent.code}</td>
                  <td>{agent.firstName}</td>
                  <td>{agent.middleName}</td>
                  <td>{agent.lastName}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${agent.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${agent.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${agent.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="myApp.agent.home.notFound">No Agents found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ agent }: IRootState) => ({
  agentList: agent.entities,
  loading: agent.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Agent);
