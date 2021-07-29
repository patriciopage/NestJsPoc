/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { ConversationDTO } from './conversation.dto';

/**
 * A Comment DTO object.
 */
export class CommentDTO extends BaseDTO {
    @ApiModelProperty({ description: 'contents field', required: false })
    contents: any;

    @ApiModelProperty({ type: ConversationDTO, description: 'conversation relationship' })
    conversation: ConversationDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
