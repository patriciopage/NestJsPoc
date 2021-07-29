/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { ConversationDTO } from './conversation.dto';
import { ObservationDTO } from './observation.dto';
import { NotificationDTO } from './notification.dto';
import { AgentDTO } from './agent.dto';
import { CustomerDTO } from './customer.dto';
import { Status } from '../../domain/enumeration/status';

/**
 * A Incident DTO object.
 */
export class IncidentDTO extends BaseDTO {
    @ApiModelProperty({ description: 'createdAt field', required: false })
    createdAt: any;

    @ApiModelProperty({ enum: Status, description: 'status enum field', required: false })
    status: Status;

    @ApiModelProperty({ type: ConversationDTO, description: 'conversation relationship' })
    conversation: ConversationDTO;

    @ApiModelProperty({ type: ObservationDTO, isArray: true, description: 'observations relationship' })
    observations: ObservationDTO[];

    @ApiModelProperty({ type: NotificationDTO, isArray: true, description: 'notifications relationship' })
    notifications: NotificationDTO[];

    @ApiModelProperty({ type: AgentDTO, description: 'agent relationship' })
    agent: AgentDTO;

    @ApiModelProperty({ type: CustomerDTO, description: 'customer relationship' })
    customer: CustomerDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
