/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Observation } from './observation.entity';

/**
 * A Attachment.
 */
@Entity('attachment')
export class Attachment extends BaseEntity {
    @Column({ name: 'url', nullable: true })
    url: string;

    @ManyToOne(type => Observation)
    observation: Observation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
