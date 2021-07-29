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
import { AttachmentDTO } from '../../service/dto/attachment.dto';
import { AttachmentService } from '../../service/attachment.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/attachments')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('attachments')
export class AttachmentController {
    logger = new Logger('AttachmentController');

    constructor(private readonly attachmentService: AttachmentService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AttachmentDTO,
    })
    async getAll(@Req() req: Request): Promise<AttachmentDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.attachmentService.findAndCount({
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
        type: AttachmentDTO,
    })
    async getOne(@Param('id') id: string): Promise<AttachmentDTO> {
        return await this.attachmentService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create attachment' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AttachmentDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() attachmentDTO: AttachmentDTO): Promise<AttachmentDTO> {
        const created = await this.attachmentService.save(attachmentDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Attachment', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update attachment' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AttachmentDTO,
    })
    async put(@Req() req: Request, @Body() attachmentDTO: AttachmentDTO): Promise<AttachmentDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Attachment', attachmentDTO.id);
        return await this.attachmentService.update(attachmentDTO);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update attachment with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AttachmentDTO,
    })
    async putId(@Req() req: Request, @Body() attachmentDTO: AttachmentDTO): Promise<AttachmentDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Attachment', attachmentDTO.id);
        return await this.attachmentService.update(attachmentDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete attachment' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Attachment', id);
        return await this.attachmentService.deleteById(id);
    }
}
