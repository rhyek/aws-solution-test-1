import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class CreateOrderService {
  handle(input: CreateOrderDto): string {
    return `product id: ${input.productId}`;
  }
}
