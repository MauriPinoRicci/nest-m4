import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './Dtos/signUp-auth.dto';
import { Role } from '../users/enum/role.enum';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const mockUserService: Partial<UsersService> = {
      findByEmail: () => Promise.resolve(undefined),
      createUser: (entityLike?: Partial<Users>) =>
        Promise.resolve({
          ...entityLike,
          admin: 'user',
          id: '1234fs-1234fs-1234fs-1234fs',
        } as Users),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(Users), useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: UsersService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  const mockUser = new SignUpAuthDto({
    name: 'John Doe',
    password: '123456',
    passwordConfirm: '123456',
    email: 'johndoe@example.com',
    address: 'Fake St. 123',
    phone: '12334564',
    city: 'Maipu',
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signUp() create a new user with encrypted password', async () => {
    const user = await service.signUp(mockUser);
    console.log(user);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('admin', Role.User);
    expect(user).toHaveProperty('password');
  });
});
