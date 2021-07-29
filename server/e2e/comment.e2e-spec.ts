import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { CommentDTO } from '../src/service/dto/comment.dto';
import { CommentService } from '../src/service/comment.service';

describe('Comment Controller', () => {
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
            .overrideProvider(CommentService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all comments ', async () => {
        const getEntities: CommentDTO[] = (await request(app.getHttpServer())
            .get('/api/comments')
            .expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET comments by id', async () => {
        const getEntity: CommentDTO = (await request(app.getHttpServer())
            .get('/api/comments/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create comments', async () => {
        const createdEntity: CommentDTO = (await request(app.getHttpServer())
            .post('/api/comments')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update comments', async () => {
        const updatedEntity: CommentDTO = (await request(app.getHttpServer())
            .put('/api/comments')
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update comments from id', async () => {
        const updatedEntity: CommentDTO = (await request(app.getHttpServer())
            .put('/api/comments/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE comments', async () => {
        const deletedEntity: CommentDTO = (await request(app.getHttpServer())
            .delete('/api/comments/' + entityMock.id)
            .expect(204)).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
