import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { hash } from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './Dtos/signUp-auth.dto';
import { SignInAuthDto } from './Dtos/signIn-auth.dto';
import { UserResponseDto } from '../users/Dtos/response-user.dto';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const hashedPassword = await hash('123456', 10);
    const mockUserService: Partial<UsersService> = {
      findByEmail: (email: string) => {
        if (email === 'johndou@email.com') {
          return Promise.resolve({
            email: 'johndou@email.com',
            password: hashedPassword,
            admin: 'user',
          } as Users);
        } else {
          return Promise.resolve(undefined);
        }
      },
      createUser: (entityLike?: Partial<Users>): Promise<Users> =>
        Promise.resolve({
          ...entityLike,
          admin: 'user',
          id: '1234fs-1234fs-1234fs-1234fs',
        } as Users),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: getRepositoryToken(Users), useValue: {} },
        {
          provide: JwtService,
          useValue: { signAsync: () => Promise.resolve('mockJwtToken') },
        },
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  const mockSignUpUser = new SignUpAuthDto({
    name: 'John Doe',
    password: '123456',
    passwordConfirm: '123456',
    email: 'johndou1@email.com',
    address: 'Fake St. 123',
    phone: '12334564',
  });

  const mockSignInUser = new SignInAuthDto({
    email: 'johndou@email.com',
    password: '123456',
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('signUp() should return a new UserResponseDto and create USer', async () => {
    const user = await controller.signUp(mockSignUpUser);
    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(UserResponseDto);
    expect(user).toHaveProperty('id');
  });

  it('signIn() should return a token', async () => {
    const token = await controller.signIn(mockSignInUser);
    console.log(token);
    expect(token).toBeDefined();
    expect(token).toHaveProperty('token');
  });
});
