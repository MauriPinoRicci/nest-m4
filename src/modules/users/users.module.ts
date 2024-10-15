import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "./users.entity";
import { SharedModule } from "src/shared/shared.module";

@Module({
    imports: [TypeOrmModule.forFeature([Users]),SharedModule],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository], 
    exports: [UsersService, UsersRepository], 
})
export class UserModule {}
