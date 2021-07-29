import { EntityRepository, Repository } from 'typeorm';
import { Notification } from '../domain/notification.entity';

@EntityRepository(Notification)
export class NotificationRepository extends Repository<Notification> {}
