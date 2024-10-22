import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
import { UserDto } from './Dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) { }

  async getUsers(page: number = 1, limit: number = 5): Promise<UserDto[]> {
    return this.userRepository.getUsers(page, limit);
  }

  async getUsersById(id: string): Promise<UserDto | null> {
    const user = await this.userRepository.getUsersById(id);

    if (!user) return null;

    return user;
  }

  async createUser(user: Omit<UserDto, 'id'> & { password: string }): Promise<{ id: string }> {
    const newUser = await this.userRepository.createUser(user);
    return { id: newUser.id };
  }

  async modifyUser(
    id: string,
    updatedUserData: Partial<Omit<UserDto, 'id' | 'password'>>,
  ): Promise<UserDto | null> {
    const updatedUser = await this.userRepository.modifyUser(
      id,
      updatedUserData,
    );

    if (!updatedUser) return null;

    return updatedUser;
  }

  async deleteUser(id: string): Promise<{ id: string }> {
    const deletedUser = await this.userRepository.deleteUser(id);

    if (!deletedUser) {
      throw new Error('User not found');
    }

    return { id: deletedUser.id };
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    return this.userRepository.findByEmail(email);
  }
}
