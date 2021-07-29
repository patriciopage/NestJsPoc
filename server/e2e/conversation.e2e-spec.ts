import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ConversationDTO } from '../src/service/dto/conversation.dto';
import { ConversationService } from '../src/service/conversation.service';

describe('Conversation Controller', () => {
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
            .overrideProvider(ConversationService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all conversations ', async () => {
        const getEntities: ConversationDTO[] = (await request(app.getHttpServer())
            .get('/api/conversations')
            .expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET conversations by id', async () => {
        const getEntity: ConversationDTO = (await request(app.getHttpServer())
            .get('/api/conversations/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create conversations', async () => {
        const createdEntity: ConversationDTO = (await request(app.getHttpServer())
            .post('/api/conversations')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update conversations', async () => {
        const updatedEntity: ConversationDTO = (await request(app.getHttpServer())
            .put('/api/conversations')
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update conversations from id', async () => {
        const updatedEntity: ConversationDTO = (await request(app.getHttpServer())
            .put('/api/conversations/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE conversations', async () => {
        const deletedEntity: ConversationDTO = (await request(app.getHttpServer())
            .delete('/api/conversations/' + entityMock.id)
            .expect(204)).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
