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
import { AgentDTO } from '../../service/dto/agent.dto';
import { AgentService } from '../../service/agent.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/agents')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('agents')
export class AgentController {
    logger = new Logger('AgentController');

    constructor(private readonly agentService: AgentService) {}

    @Get('/')
    @Roles(RoleType.USER)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: AgentDTO,
    })
    async getAll(@Req() req: Request): Promise<AgentDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.agentService.findAndCount({
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
        type: AgentDTO,
    })
    async getOne(@Param('id') id: string): Promise<AgentDTO> {
        return await this.agentService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Create agent' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: AgentDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() agentDTO: AgentDTO): Promise<AgentDTO> {
        const created = await this.agentService.save(agentDTO);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Agent', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update agent' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AgentDTO,
    })
    async put(@Req() req: Request, @Body() agentDTO: AgentDTO): Promise<AgentDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Agent', agentDTO.id);
        return await this.agentService.update(agentDTO);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Update agent with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: AgentDTO,
    })
    async putId(@Req() req: Request, @Body() agentDTO: AgentDTO): Promise<AgentDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Agent', agentDTO.id);
        return await this.agentService.update(agentDTO);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN)
    @ApiOperation({ title: 'Delete agent' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Agent', id);
        return await this.agentService.deleteById(id);
    }
}
