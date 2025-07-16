import { Controller, Get } from '@nestjs/common';
import { StockManagementService } from './stock-management.service';

@Controller()
export class StockManagementController {
  constructor(private readonly stockManagementService: StockManagementService) {}

  @Get()
  getHello(): string {
    return this.stockManagementService.getHello();
  }
}
