/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Comment } from './comment.entity';
import { Incident } from './incident.entity';

/**
 * A Conversation.
 */
@Entity('conversation')
export class Conversation extends BaseEntity {
    @Column({ type: 'blob', name: 'contents', nullable: true })
    contents: any;

    @OneToMany(type => Comment, other => other.conversation)
    comments: Comment[];

    @OneToOne(type => Incident)
    incident: Incident;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
