import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from '../web/rest/notification.controller';
import { NotificationRepository } from '../repository/notification.repository';
import { NotificationService } from '../service/notification.service';

@Module({
    imports: [TypeOrmModule.forFeature([NotificationRepository])],
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
