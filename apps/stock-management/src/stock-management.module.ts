import { Module } from '@nestjs/common';
import { StockManagementController } from './stock-management.controller';
import { StockManagementService } from './stock-management.service';
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
        host: config.get<string>('STOCK_DB_HOST'),
        port: parseInt(config.get<string>('STOCK_DB_PORT', '5432'), 10),
        username: config.get<string>('STOCK_DB_USER'),
        password: config.get<string>('STOCK_DB_PASS'),
        database: config.get<string>('STOCK_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [StockManagementController],
  providers: [StockManagementService],
})
export class StockManagementModule {}
