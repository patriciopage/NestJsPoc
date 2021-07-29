import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObservationController } from '../web/rest/observation.controller';
import { ObservationRepository } from '../repository/observation.repository';
import { ObservationService } from '../service/observation.service';

@Module({
    imports: [TypeOrmModule.forFeature([ObservationRepository])],
    controllers: [ObservationController],
    providers: [ObservationService],
    exports: [ObservationService],
})
export class ObservationModule {}
