/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { AttachmentDTO } from './attachment.dto';
import { IncidentDTO } from './incident.dto';

/**
 * A Observation DTO object.
 */
export class ObservationDTO extends BaseDTO {
    @ApiModelProperty({ description: 'contents field', required: false })
    contents: any;

    @ApiModelProperty({ type: AttachmentDTO, isArray: true, description: 'attachments relationship' })
    attachments: AttachmentDTO[];

    @ApiModelProperty({ type: IncidentDTO, description: 'incident relationship' })
    incident: IncidentDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
