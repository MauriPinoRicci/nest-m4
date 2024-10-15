import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './Dtos/signUp-auth.dto';
import { UserResponseDto } from '../users/Dtos/response-user.dto';
import { SignInAuthDto } from './Dtos/signIn-auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() credentials: SignInAuthDto) {
    console.log('Received credentials:', credentials);
    try {
      const token = await this.authService.signIn(credentials);
      return token ;
    } catch (error) {
      throw new HttpException({ message: error.message }, error.getStatus());
    }
  }

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpUser: SignUpAuthDto) {
    const user = await this.authService.signUp(signUpUser);
    return new UserResponseDto(user);
  }

  @Get('auth0/protected')
  getAuth0PRotected(@Req() request) {
    console.log(JSON.stringify(request.oidc.idToken));
    return JSON.stringify(request.oidc.user);
  }
}
