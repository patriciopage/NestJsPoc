/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { IncidentDTO } from './incident.dto';

/**
 * A Agent DTO object.
 */
export class AgentDTO extends BaseDTO {
    @ApiModelProperty({ description: 'code field', required: false })
    code: number;

    @ApiModelProperty({ description: 'firstName field', required: false })
    firstName: string;

    @ApiModelProperty({ description: 'middleName field', required: false })
    middleName: string;

    @ApiModelProperty({ description: 'lastName field', required: false })
    lastName: string;

    @ApiModelProperty({ type: IncidentDTO, isArray: true, description: 'incidents relationship' })
    incidents: IncidentDTO[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
