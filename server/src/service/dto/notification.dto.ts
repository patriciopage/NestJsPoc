/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { IncidentDTO } from './incident.dto';
import { NotificationSource } from '../../domain/enumeration/notification-source';

/**
 * A Notification DTO object.
 */
export class NotificationDTO extends BaseDTO {
    @ApiModelProperty({ enum: NotificationSource, description: 'source enum field', required: false })
    source: NotificationSource;

    @ApiModelProperty({ description: 'contents field', required: false })
    contents: any;

    @ApiModelProperty({ type: IncidentDTO, description: 'incident relationship' })
    incident: IncidentDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
