import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentController } from '../web/rest/attachment.controller';
import { AttachmentRepository } from '../repository/attachment.repository';
import { AttachmentService } from '../service/attachment.service';

@Module({
    imports: [TypeOrmModule.forFeature([AttachmentRepository])],
    controllers: [AttachmentController],
    providers: [AttachmentService],
    exports: [AttachmentService],
})
export class AttachmentModule {}
