import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { AttachmentDTO } from '../src/service/dto/attachment.dto';
import { AttachmentService } from '../src/service/attachment.service';

describe('Attachment Controller', () => {
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
            .overrideProvider(AttachmentService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all attachments ', async () => {
        const getEntities: AttachmentDTO[] = (await request(app.getHttpServer())
            .get('/api/attachments')
            .expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET attachments by id', async () => {
        const getEntity: AttachmentDTO = (await request(app.getHttpServer())
            .get('/api/attachments/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create attachments', async () => {
        const createdEntity: AttachmentDTO = (await request(app.getHttpServer())
            .post('/api/attachments')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update attachments', async () => {
        const updatedEntity: AttachmentDTO = (await request(app.getHttpServer())
            .put('/api/attachments')
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update attachments from id', async () => {
        const updatedEntity: AttachmentDTO = (await request(app.getHttpServer())
            .put('/api/attachments/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE attachments', async () => {
        const deletedEntity: AttachmentDTO = (await request(app.getHttpServer())
            .delete('/api/attachments/' + entityMock.id)
            .expect(204)).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
