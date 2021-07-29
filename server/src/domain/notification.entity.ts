/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Incident } from './incident.entity';
import { NotificationSource } from './enumeration/notification-source';

/**
 * A Notification.
 */
@Entity('notification')
export class Notification extends BaseEntity {
    @Column({ type: 'simple-enum', name: 'source', enum: NotificationSource })
    source: NotificationSource;

    @Column({ type: 'blob', name: 'contents', nullable: true })
    contents: any;

    @ManyToOne(type => Incident)
    incident: Incident;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
