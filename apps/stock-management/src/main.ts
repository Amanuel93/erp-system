import { NestFactory } from '@nestjs/core';
import { StockManagementModule } from './stock-management.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(StockManagementModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID || 'stock-management-consumer',
      },
    },
  });
  await app.listen();
}
bootstrap();
