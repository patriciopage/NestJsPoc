import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { NotificationDTO } from '../src/service/dto/notification.dto';
import { NotificationService } from '../src/service/notification.service';

describe('Notification Controller', () => {
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
            .overrideProvider(NotificationService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all notifications ', async () => {
        const getEntities: NotificationDTO[] = (await request(app.getHttpServer())
            .get('/api/notifications')
            .expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET notifications by id', async () => {
        const getEntity: NotificationDTO = (await request(app.getHttpServer())
            .get('/api/notifications/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create notifications', async () => {
        const createdEntity: NotificationDTO = (await request(app.getHttpServer())
            .post('/api/notifications')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update notifications', async () => {
        const updatedEntity: NotificationDTO = (await request(app.getHttpServer())
            .put('/api/notifications')
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update notifications from id', async () => {
        const updatedEntity: NotificationDTO = (await request(app.getHttpServer())
            .put('/api/notifications/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE notifications', async () => {
        const deletedEntity: NotificationDTO = (await request(app.getHttpServer())
            .delete('/api/notifications/' + entityMock.id)
            .expect(204)).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
