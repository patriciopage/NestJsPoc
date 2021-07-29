import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { ObservationDTO } from '../../service/dto/observation.dto';
import { ObservationService } from '../../service/observation.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/observations')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('observations')
export class ObservationController {
    logger = new Logger('ObservationController');

    constructor(private readonly observationService: ObservationService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ObservationDTO,
    })
    async getAll(@Req() req: Request): Promise<ObservationDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.observationService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: ObservationDTO,
    })
    async getOne(@Param('id') id: string): Promise<ObservationDTO> {
        return await this.observationService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create observation' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ObservationDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() observationDTO: ObservationDTO): Promise<ObservationDTO> {
        const created = await this.observationService.save(observationDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Observation', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update observation' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ObservationDTO,
    })
    async put(@Req() req: Request, @Body() observationDTO: ObservationDTO): Promise<ObservationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Observation', observationDTO.id);
        return await this.observationService.update(observationDTO);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update observation with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ObservationDTO,
    })
    async putId(@Req() req: Request, @Body() observationDTO: ObservationDTO): Promise<ObservationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Observation', observationDTO.id);
        return await this.observationService.update(observationDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete observation' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Observation', id);
        return await this.observationService.deleteById(id);
    }
}
