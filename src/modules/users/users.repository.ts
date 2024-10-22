import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { UserDto } from "./Dtos/user.dto";
import { Role } from "./enum/role.enum";

@Injectable()
export class UsersRepository {
   
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) { }

    async createUser(user: Omit<UserDto, 'id'> & { password: string, admin?: Role }): Promise<UserDto> {
        const newUser = this.userRepository.create({
            ...user,
            admin: user.admin || Role.User, 
            createdAt: new Date(),
        });
    
        const savedUser = await this.userRepository.save(newUser);
        return savedUser; 
    }
    

    async getUsers(page: number = 1, limit: number = 5): Promise<UserDto[]> {
        const [users] = await this.userRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            select: ['id', 'email', 'name', 'address', 'phone', 'country', 'city', 'createdAt','admin'],
            relations: ['orders','orders.orderDetails'], 
        });

        return users.map(user => {
            const { password, ...rest } = user;
            return rest as unknown as UserDto;
        });
    }

    async getUsersById(id: string): Promise<UserDto | null> {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'email', 'name', 'address', 'phone', 'country', 'city', 'createdAt'],
        });

        if (!user) {
            return null;
        }

        return {
            ...user,
            createdAt: new Date(user.createdAt), 
        } as UserDto;
    }

    async modifyUser(id: string, updatedUserData: Partial<Omit<UserDto, 'id' | 'password'>>): Promise<UserDto | null> {
        const user = await this.userRepository.preload({
            id,
            ...updatedUserData,
        });

        if (!user) {
            return null;
        }

        const savedUser = await this.userRepository.save(user);

        return {
            ...savedUser,
            createdAt: new Date(user.createdAt), 
        } as UserDto;
    }

    async deleteUser(id: string): Promise<UserDto | null> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            return null;
        }

        await this.userRepository.remove(user);

        return {
            ...user,
            createdAt: new Date(user.createdAt), 
        } as UserDto;
    }

    async findByEmail(email: string): Promise<Users | null> {
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'email', 'name', 'address', 'phone', 'country', 'city', 'createdAt','password'],
        });

        return user || null;
    }
}
