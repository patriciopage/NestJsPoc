import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { IncidentDTO } from '../src/service/dto/incident.dto';
import { IncidentService } from '../src/service/incident.service';

describe('Incident Controller', () => {
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
            .overrideProvider(IncidentService)
            .useValue(serviceMock)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET all incidents ', async () => {
        const getEntities: IncidentDTO[] = (await request(app.getHttpServer())
            .get('/api/incidents')
            .expect(200)).body;

        expect(getEntities).toEqual(entityMock);
    });

    it('/GET incidents by id', async () => {
        const getEntity: IncidentDTO = (await request(app.getHttpServer())
            .get('/api/incidents/' + entityMock.id)
            .expect(200)).body;

        expect(getEntity).toEqual(entityMock);
    });

    it('/POST create incidents', async () => {
        const createdEntity: IncidentDTO = (await request(app.getHttpServer())
            .post('/api/incidents')
            .send(entityMock)
            .expect(201)).body;

        expect(createdEntity).toEqual(entityMock);
    });

    it('/PUT update incidents', async () => {
        const updatedEntity: IncidentDTO = (await request(app.getHttpServer())
            .put('/api/incidents')
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/PUT update incidents from id', async () => {
        const updatedEntity: IncidentDTO = (await request(app.getHttpServer())
            .put('/api/incidents/' + entityMock.id)
            .send(entityMock)
            .expect(201)).body;

        expect(updatedEntity).toEqual(entityMock);
    });

    it('/DELETE incidents', async () => {
        const deletedEntity: IncidentDTO = (await request(app.getHttpServer())
            .delete('/api/incidents/' + entityMock.id)
            .expect(204)).body;

        expect(deletedEntity).toEqual({});
    });

    afterEach(async () => {
        await app.close();
    });
});
