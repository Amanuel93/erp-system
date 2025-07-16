import { Test, TestingModule } from '@nestjs/testing';
import { StockManagementController } from './stock-management.controller';
import { StockManagementService } from './stock-management.service';

describe('StockManagementController', () => {
  let stockManagementController: StockManagementController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StockManagementController],
      providers: [StockManagementService],
    }).compile();

    stockManagementController = app.get<StockManagementController>(StockManagementController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(stockManagementController.getHello()).toBe('Hello World!');
    });
  });
});
