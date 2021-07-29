import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerUpdate = (props: ICustomerUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { customerEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer');
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
        ...customerEntity,
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
          <h2 id="myApp.customer.home.createOrEditLabel" data-cy="CustomerCreateUpdateHeading">
            <Translate contentKey="myApp.customer.home.createOrEditLabel">Create or edit a Customer</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="customer-code">
                  <Translate contentKey="myApp.customer.code">Code</Translate>
                </Label>
                <AvField id="customer-code" data-cy="code" type="string" className="form-control" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="customer-firstName">
                  <Translate contentKey="myApp.customer.firstName">First Name</Translate>
                </Label>
                <AvField id="customer-firstName" data-cy="firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="middleNameLabel" for="customer-middleName">
                  <Translate contentKey="myApp.customer.middleName">Middle Name</Translate>
                </Label>
                <AvField id="customer-middleName" data-cy="middleName" type="text" name="middleName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="customer-lastName">
                  <Translate contentKey="myApp.customer.lastName">Last Name</Translate>
                </Label>
                <AvField id="customer-lastName" data-cy="lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="customer-email">
                  <Translate contentKey="myApp.customer.email">Email</Translate>
                </Label>
                <AvField id="customer-email" data-cy="email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="customer-phone">
                  <Translate contentKey="myApp.customer.phone">Phone</Translate>
                </Label>
                <AvField id="customer-phone" data-cy="phone" type="text" name="phone" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine1Label" for="customer-addressLine1">
                  <Translate contentKey="myApp.customer.addressLine1">Address Line 1</Translate>
                </Label>
                <AvField id="customer-addressLine1" data-cy="addressLine1" type="text" name="addressLine1" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine2Label" for="customer-addressLine2">
                  <Translate contentKey="myApp.customer.addressLine2">Address Line 2</Translate>
                </Label>
                <AvField id="customer-addressLine2" data-cy="addressLine2" type="text" name="addressLine2" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer" replace color="info">
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
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUpdate);
