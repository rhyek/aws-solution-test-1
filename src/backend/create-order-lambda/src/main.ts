import { HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';
import { CreateOrderModule } from './create-order.module';
import { CreateOrderService } from './create-order.service';

let service: CreateOrderService | null = null;

export const handler: APIGatewayProxyHandler = async (event) => {
  service =
    service ??
    (await (async () => {
      const appContext = await NestFactory.createApplicationContext(
        CreateOrderModule,
      );
      return appContext.get(CreateOrderService);
    })())!;
  console.log(JSON.stringify(event));
  const input = plainToClass(CreateOrderDto, JSON.parse(event.body!));
  await validateOrReject(input);

  return {
    body: await service.handle(input),
    statusCode: HttpStatus.OK,
  };
};
