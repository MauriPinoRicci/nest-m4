import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { createOrderDetailDto } from './Dtos/create-order-detail.dto';
import { updateOrderDetailDto } from './Dtos/update-order-detail.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('order-details')
@Controller('order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  async create(@Body() createOrderDetailDto: createOrderDetailDto) {
    return await this.orderDetailsService.create(createOrderDetailDto);
  }

  @Get()
  async findAll() {
    return await this.orderDetailsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderDetailsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDetailDto: updateOrderDetailDto,
  ) {
    return await this.orderDetailsService.update(id, updateOrderDetailDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.orderDetailsService.remove(id);
  }
}
