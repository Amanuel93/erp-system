import { NestFactory } from '@nestjs/core';
import { ProjectManagementModule } from './project-management.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProjectManagementModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID || 'project-management-consumer',
      },
    },
  });
  await app.listen();
}
bootstrap();
