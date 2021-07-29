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
import { ConversationDTO } from '../../service/dto/conversation.dto';
import { ConversationService } from '../../service/conversation.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/conversations')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('conversations')
export class ConversationController {
    logger = new Logger('ConversationController');

    constructor(private readonly conversationService: ConversationService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: ConversationDTO,
    })
    async getAll(@Req() req: Request): Promise<ConversationDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.conversationService.findAndCount({
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
        type: ConversationDTO,
    })
    async getOne(@Param('id') id: string): Promise<ConversationDTO> {
        return await this.conversationService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create conversation' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ConversationDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() conversationDTO: ConversationDTO): Promise<ConversationDTO> {
        const created = await this.conversationService.save(conversationDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Conversation', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update conversation' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ConversationDTO,
    })
    async put(@Req() req: Request, @Body() conversationDTO: ConversationDTO): Promise<ConversationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Conversation', conversationDTO.id);
        return await this.conversationService.update(conversationDTO);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update conversation with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ConversationDTO,
    })
    async putId(@Req() req: Request, @Body() conversationDTO: ConversationDTO): Promise<ConversationDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Conversation', conversationDTO.id);
        return await this.conversationService.update(conversationDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete conversation' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Conversation', id);
        return await this.conversationService.deleteById(id);
    }
}
