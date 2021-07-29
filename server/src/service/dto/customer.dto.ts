/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { IncidentDTO } from './incident.dto';

/**
 * A Customer DTO object.
 */
export class CustomerDTO extends BaseDTO {
    @ApiModelProperty({ description: 'code field', required: false })
    code: number;

    @ApiModelProperty({ description: 'firstName field', required: false })
    firstName: string;

    @ApiModelProperty({ description: 'middleName field', required: false })
    middleName: string;

    @ApiModelProperty({ description: 'lastName field', required: false })
    lastName: string;

    @ApiModelProperty({ description: 'email field', required: false })
    email: string;

    @ApiModelProperty({ description: 'phone field', required: false })
    phone: string;

    @ApiModelProperty({ description: 'addressLine1 field', required: false })
    addressLine1: string;

    @ApiModelProperty({ description: 'addressLine2 field', required: false })
    addressLine2: string;

    @ApiModelProperty({ type: IncidentDTO, isArray: true, description: 'incidents relationship' })
    incidents: IncidentDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
