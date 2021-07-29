/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Attachment } from './attachment.entity';
import { Incident } from './incident.entity';

/**
 * A Observation.
 */
@Entity('observation')
export class Observation extends BaseEntity {
    @Column({ type: 'blob', name: 'contents', nullable: true })
    contents: any;

    @OneToMany(type => Attachment, other => other.observation)
    attachments: Attachment[];

    @ManyToOne(type => Incident)
    incident: Incident;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
