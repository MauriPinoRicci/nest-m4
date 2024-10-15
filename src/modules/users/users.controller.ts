import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { UuidValidationPipe } from 'src/pipes/uuid-validation.pipe';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './enum/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './Dtos/user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 5;
    const users = await this.usersService.getUsers(pageNumber, limitNumber);
    return users;
  }

  @Get('admin')
  @Roles(Role.Admin)
  getAdmin() {
    return 'Ruta protegida';
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getUsersById(@Param('id', UuidValidationPipe) id: string) {
    const user = await this.usersService.getUsersById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { data: user };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUsers(@Body() user: UserDto) {
    const createdUser = await this.usersService.createUser(user);
    return { data: createdUser };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async putUsers(
    @Param('id', UuidValidationPipe) id: string,
    @Body() userData: Partial<UserDto>,
  ) {
    const updatedUser = await this.usersService.modifyUser(id, userData);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { data: updatedUser };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async deleteUsers(@Param('id', UuidValidationPipe) id: string) {
    const result = await this.usersService.deleteUser(id);
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: 'User deleted successfully' };
  }
}
