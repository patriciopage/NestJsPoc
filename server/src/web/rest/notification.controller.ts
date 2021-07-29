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
import { NotificationDTO } from '../../service/dto/notification.dto';
import { NotificationService } from '../../service/notification.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/notifications')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('notifications')
export class NotificationController {
    logger = new Logger('NotificationController');

    constructor(private readonly notificationService: NotificationService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: NotificationDTO,
    })
    async getAll(@Req() req: Request): Promise<NotificationDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.notificationService.findAndCount({
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
        type: NotificationDTO,
    })
    async getOne(@Param('id') id: string): Promise<NotificationDTO> {
        return await this.notificationService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create notification' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: NotificationDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() notificationDTO: NotificationDTO): Promise<NotificationDTO> {
        const created = await this.notificationService.save(notificationDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Notification', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update notification' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: NotificationDTO,
    })
    async put(@Req() req: Request, @Body() notificationDTO: NotificationDTO): Promise<NotificationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Notification', notificationDTO.id);
        return await this.notificationService.update(notificationDTO);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update notification with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: NotificationDTO,
    })
    async putId(@Req() req: Request, @Body() notificationDTO: NotificationDTO): Promise<NotificationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Notification', notificationDTO.id);
        return await this.notificationService.update(notificationDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete notification' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Notification', id);
        return await this.notificationService.deleteById(id);
    }
}
