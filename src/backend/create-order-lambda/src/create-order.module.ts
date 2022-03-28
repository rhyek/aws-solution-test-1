import { Module } from '@nestjs/common';
import { CreateOrderService } from './create-order.service';

@Module({
  imports: [],
  providers: [CreateOrderService],
})
export class CreateOrderModule {}
