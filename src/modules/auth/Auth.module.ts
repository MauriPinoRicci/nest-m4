import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../users/users.entity";
import { SharedModule } from "src/shared/shared.module";
import { UsersService } from "../users/users.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [UserModule,TypeOrmModule.forFeature([Users]),SharedModule], 
    controllers: [AuthController],
    providers: [AuthService,UsersService],
})
export class AuthModule { }
