import { Controller, Get, Delete, Query, Param, Body, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { articleListData, categoriesData, articleList, articleDetailData } from '../mock-data/helpCenterData';
import wildCardSearch from '../utils/wildCardSearch';
import sortBy, { Primer } from '../utils/sortBy';
import paginate from '../utils/paginate';

@Controller('helps/articles')
export class HelpCenterController {
  private articles = [...articleListData];
  private managedList = articleList;

  @Get()
  getArticles(
    @Query('query') query = '',
    @Query('topic') topic = '',
  ) {
    const list = [...this.articles];

    if (query) {
      return wildCardSearch(list, query);
    }

    if (topic) {
      return list.filter((article) => article.category === topic);
    }

    return list;
  }

  @Get('categories')
  getCategories() {
    return {
      categories: categoriesData,
      popularArticles: this.articles.filter((article) => article.starred),
    };
  }

  @Get('manage')
  getManageArticles(
    @Query('pageIndex') pageIndex = '1',
    @Query('pageSize') pageSize = '10',
    @Query('sortKey') sortKey = '',
    @Query('order') order = 'asc',
    @Query('query') query = '',
    @Query('category') category?: string,
  ) {
    const articles = this.managedList.getList() as any[];
    let data = structuredClone(articles);
    let total = articles.length;

    if (sortKey) {
      if (sortKey !== 'updateTimeStamp') {
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
      data = wildCardSearch(data, query);
      total = data.length;
    }

    if (category) {
      const categories = category.split(',');
      data = data.filter((article) => categories.includes(article.category));
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
  getArticle(@Param('id') id: string) {
    const article = this.articles.find((a) => a.id === id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return {
      ...article,
      ...articleDetailData,
    };
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  deleteArticles(@Body() body: any) {
    const { articleIds } = body;
    if (articleIds && Array.isArray(articleIds)) {
      this.articles = this.articles.filter(
        (item) => !articleIds.includes(item.id),
      );
      const filteredManaged = this.managedList.getList().filter(
        (item) => !articleIds.includes(item.id),
      );
      this.managedList.setList(filteredManaged);
    }
    return {};
  }
}
