import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpAuthDto } from './Dtos/signUp-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { SignInAuthDto } from './Dtos/signIn-auth.dto';
import { Users } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentials: SignInAuthDto) {
    const user = await this.userService.findByEmail(credentials.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!user.password) {
      throw new HttpException(
        'No password set for this user',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!credentials.password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }


    const isPasswordMatching = await compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = await this.createToken(user);
    return {token} ;
  }

  async signUp(signUpUser: SignUpAuthDto) {
    const existingUser = await this.userService.findByEmail(signUpUser.email);
    if (existingUser) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    }

    if (signUpUser.password !== signUpUser.passwordConfirm) {
      throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
    }

    signUpUser.password = await hash(signUpUser.password, 10);

    const newUser = await this.userService.createUser(signUpUser);
    return newUser;
  }

  private async createToken(user: Users) {
    const payload = {
      id: user.id,
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return this.jwtService.signAsync(payload);
  }
}
