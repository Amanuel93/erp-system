import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('SALES_DB_HOST'),
        port: parseInt(config.get<string>('SALES_DB_PORT', '5432'), 10),
        username: config.get<string>('SALES_DB_USER'),
        password: config.get<string>('SALES_DB_PASS'),
        database: config.get<string>('SALES_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
