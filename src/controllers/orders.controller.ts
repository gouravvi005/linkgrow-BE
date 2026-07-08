import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ordersData, orderDetailsData } from '../mock-data/ordersData';
import paginate from '../utils/paginate';
import sortBy, { Primer } from '../utils/sortBy';
import wildCardSearch from '../utils/wildCardSearch';

@Controller('orders')
export class OrdersController {
  @Get()
  getOrders(
    @Query('pageIndex') pageIndex = '1',
    @Query('pageSize') pageSize = '10',
    @Query('sortKey') sortKey = '',
    @Query('order') order = 'asc',
    @Query('query') query = '',
  ) {
    const orders = ordersData as any[];
    let data = structuredClone(orders);
    let total = orders.length;

    if (sortKey) {
      if (sortKey === 'paymentMehod') {
        data.sort(
          sortBy(sortKey, order === 'desc', (a) =>
            (a as string).toUpperCase(),
          ),
        );
      } else {
        data.sort(
          sortBy(sortKey, order === 'desc', parseInt as Primer),
        );
      }
    }

    if (query) {
      data = wildCardSearch(data, query, 'id');
      total = data.length;
    }

    data = paginate(
      data,
      parseInt(pageSize),
      parseInt(pageIndex),
    );

    return {
      list: data,
      total,
    };
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    const order = ordersData.find((o) => o.id === id);
    const details = structuredClone(orderDetailsData);
    if (order) {
      details.id = order.id;
      details.paymentStatus = order.status;
    } else {
      throw new NotFoundException('Order not found');
    }
    return details;
  }
}
