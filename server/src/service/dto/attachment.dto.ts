/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { ObservationDTO } from './observation.dto';

/**
 * A Attachment DTO object.
 */
export class AttachmentDTO extends BaseDTO {
    @ApiModelProperty({ description: 'url field', required: false })
    url: string;

    @ApiModelProperty({ type: ObservationDTO, description: 'observation relationship' })
    observation: ObservationDTO;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
