import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncidentController } from '../web/rest/incident.controller';
import { IncidentRepository } from '../repository/incident.repository';
import { IncidentService } from '../service/incident.service';

@Module({
    imports: [TypeOrmModule.forFeature([IncidentRepository])],
    controllers: [IncidentController],
    providers: [IncidentService],
    exports: [IncidentService],
})
export class IncidentModule {}
