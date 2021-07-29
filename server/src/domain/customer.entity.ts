/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Incident } from './incident.entity';

/**
 * A Customer.
 */
@Entity('customer')
export class Customer extends BaseEntity {
    @Column({ type: 'long', name: 'code', nullable: true })
    code: number;

    @Column({ name: 'first_name', nullable: true })
    firstName: string;

    @Column({ name: 'middle_name', nullable: true })
    middleName: string;

    @Column({ name: 'last_name', nullable: true })
    lastName: string;

    @Column({ name: 'email', nullable: true })
    email: string;

    @Column({ name: 'phone', nullable: true })
    phone: string;

    @Column({ name: 'address_line_1', nullable: true })
    addressLine1: string;

    @Column({ name: 'address_line_2', nullable: true })
    addressLine2: string;

    @OneToMany(type => Incident, other => other.customer)
    incidents: Incident[];

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
