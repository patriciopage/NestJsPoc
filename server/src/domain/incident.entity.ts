/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Conversation } from './conversation.entity';
import { Observation } from './observation.entity';
import { Notification } from './notification.entity';
import { Agent } from './agent.entity';
import { Customer } from './customer.entity';
import { Status } from './enumeration/status';

/**
 * A Incident.
 */
@Entity('incident')
export class Incident extends BaseEntity {
    @Column({ type: 'timestamp', name: 'created_at', nullable: true })
    createdAt: any;

    @Column({ type: 'simple-enum', name: 'status', enum: Status })
    status: Status;

    @OneToOne(type => Conversation)
    @JoinColumn()
    conversation: Conversation;

    @OneToMany(type => Observation, other => other.incident)
    observations: Observation[];

    @OneToMany(type => Notification, other => other.incident)
    notifications: Notification[];

    @ManyToOne(type => Agent)
    agent: Agent;

    @ManyToOne(type => Customer)
    customer: Customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
