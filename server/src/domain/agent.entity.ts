/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Incident } from './incident.entity';

/**
 * A Agent.
 */
@Entity('agent')
export class Agent extends BaseEntity {
    @Column({ type: 'long', name: 'code', nullable: true })
    code: number;

    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'middle_name', nullable: true })
    middleName: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @OneToMany(type => Incident, other => other.agent)
    incidents: Incident[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
