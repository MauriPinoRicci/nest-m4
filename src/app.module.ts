import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoriesModule } from './modules/categories/categories.module';
import { LoggerMiddleware } from './middlewares/Logger.middleware';
import { OrderDetailsModule } from './modules/order-details/order-details.module';
import { OrdersModule } from './modules/orders/orders.module';
import { SeedsModule } from './seeds/seeds.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/Auth.module';
import {
  postgresDataSourceConfig,
  sqliteDataSourceConfig,
} from './config/data-source';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', 'env'],
      isGlobal: true,
      load: [
        postgresDataSourceConfig,
        sqliteDataSourceConfig,
        () => ({
          enviroment: process.env.ENVIRONMENT || 'TEST',
        }),
      ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('environment') === 'TEST'
          ? configService.get('sqlite')
          : configService.get('postgres'),
    }),
    UserModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrderDetailsModule,
    OrdersModule,
    SeedsModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
