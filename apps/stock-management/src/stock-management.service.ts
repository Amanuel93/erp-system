import { Injectable } from '@nestjs/common';

@Injectable()
export class StockManagementService {
  getHello(): string {
    return 'Hello World!';
  }
}
