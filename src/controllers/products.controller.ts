import { Controller, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { productsData } from '../mock-data/productData';
import paginate from '../utils/paginate';
import sortBy, { Primer } from '../utils/sortBy';
import wildCardSearch from '../utils/wildCardSearch';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('pageIndex') pageIndex = '1',
    @Query('pageSize') pageSize = '10',
    @Query('sortKey') sortKey = '',
    @Query('order') order = 'asc',
    @Query('query') query = '',
  ) {
    const products = productsData as any[];
    let data = structuredClone(products);
    let total = products.length;

    if (sortKey) {
      if (sortKey === 'category' || sortKey === 'name') {
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
      data = wildCardSearch(data, query, 'name');
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
  getProduct(@Param('id') id: string) {
    const product = productsData.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
