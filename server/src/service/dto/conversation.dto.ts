/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { CommentDTO } from './comment.dto';
import { IncidentDTO } from './incident.dto';

/**
 * A Conversation DTO object.
 */
export class ConversationDTO extends BaseDTO {
    @ApiModelProperty({ description: 'contents field', required: false })
    contents: any;

    @ApiModelProperty({ type: CommentDTO, isArray: true, description: 'comments relationship' })
    comments: CommentDTO[];

    @ApiModelProperty({ type: IncidentDTO, description: 'incident relationship' })
    incident: IncidentDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
