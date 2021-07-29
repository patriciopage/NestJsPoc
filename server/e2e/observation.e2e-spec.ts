import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { ObservationDTO } from '../src/service/dto/observation.dto';
import { ObservationService } from '../src/service/observation.service';

describe('Observation Controller', () => {
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
            .overrideProvider(ObservationService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all observations ', async () => {
        const getEntities: ObservationDTO[] = (await request(app.getHttpServer())
            .get('/api/observations')
            .expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET observations by id', async () => {
        const getEntity: ObservationDTO = (await request(app.getHttpServer())
            .get('/api/observations/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create observations', async () => {
        const createdEntity: ObservationDTO = (await request(app.getHttpServer())
            .post('/api/observations')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update observations', async () => {
        const updatedEntity: ObservationDTO = (await request(app.getHttpServer())
            .put('/api/observations')
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update observations from id', async () => {
        const updatedEntity: ObservationDTO = (await request(app.getHttpServer())
            .put('/api/observations/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE observations', async () => {
        const deletedEntity: ObservationDTO = (await request(app.getHttpServer())
            .delete('/api/observations/' + entityMock.id)
            .expect(204)).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
