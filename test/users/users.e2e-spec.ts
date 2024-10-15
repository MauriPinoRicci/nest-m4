import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { hash } from 'bcrypt';
import { AppModule } from 'src/app.module';
import { Users } from 'src/modules/users/users.entity';
import { UsersService } from 'src/modules/users/users.service';
import { TypeOrmTestModule } from 'test/typeorm-testing-config';
import * as request from 'supertest';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let userService: UsersService;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, TypeOrmTestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userService = moduleFixture.get<UsersService>(UsersService);
    const hashedPassword = await hash('123456', 10);
    jest.spyOn(userService, 'findByEmail').mockImplementation(async (email) => {
      if (email === 'johndou1@email.com') {
        return Promise.resolve({
          email: 'johndou1@email.com',
          password: hashedPassword,
          admin: 'user',
        } as Users);
      } else {
        return Promise.resolve(undefined);
      }
    });

    jest.spyOn(userService, 'getUsers').mockImplementation(async () => {
      return Promise.resolve([
        {
          email: 'johndou1@email.com',
          admin: 'user',
        },
      ] as Users[]);
    });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'johndou1@email.com',
        password: '123456',
      });
      
    authToken = loginResponse.body.token.token;
    console.log('Login response:', loginResponse.body);
  });

  afterEach(async () => {
    await app.close();
  });

  it('/users (GET) Returns array with users and OK status code', async () => {
    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${authToken}`);

    console.log('Token:', authToken);
    console.log('Request Response:', req.body);

    expect(req.status).toBe(HttpStatus.OK);
    expect(req.body).toBeInstanceOf(Array);
  });
});
