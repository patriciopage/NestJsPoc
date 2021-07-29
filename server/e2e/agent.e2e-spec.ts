import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { AgentDTO } from '../src/service/dto/agent.dto';
import { AgentService } from '../src/service/agent.service';

describe('Agent Controller', () => {
    let app: INestApplication;

    const authGuardMock = { canActivate: (): any => true };
    const rolesGuardMock = { canActivate: (): any => true };
    const entityMock: any = {
        id: 'entityId',
    };

    const serviceMock = {
        findById: (): any => entityMock,
        findAndCount: (): any => [entityMock, 0],
        save: (): any => entityMock,
        update: (): any => entityMock,
        deleteById: (): any => entityMock,
    };

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
            .overrideGuard(AuthGuard)
            .useValue(authGuardMock)
            .overrideGuard(RolesGuard)
            .useValue(rolesGuardMock)
            .overrideProvider(AgentService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all agents ', async () => {
        const getEntities: AgentDTO[] = (await request(app.getHttpServer())
            .get('/api/agents')
            .expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET agents by id', async () => {
        const getEntity: AgentDTO = (await request(app.getHttpServer())
            .get('/api/agents/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create agents', async () => {
        const createdEntity: AgentDTO = (await request(app.getHttpServer())
            .post('/api/agents')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update agents', async () => {
        const updatedEntity: AgentDTO = (await request(app.getHttpServer())
            .put('/api/agents')
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update agents from id', async () => {
        const updatedEntity: AgentDTO = (await request(app.getHttpServer())
            .put('/api/agents/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE agents', async () => {
        const deletedEntity: AgentDTO = (await request(app.getHttpServer())
            .delete('/api/agents/' + entityMock.id)
            .expect(204)).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
