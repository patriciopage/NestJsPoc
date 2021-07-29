/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Conversation } from './conversation.entity';

/**
 * A Comment.
 */
@Entity('comment')
export class Comment extends BaseEntity {
    @Column({ type: 'blob', name: 'contents', nullable: true })
    contents: any;

    @ManyToOne(type => Conversation)
    conversation: Conversation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
