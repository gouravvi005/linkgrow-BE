import { Controller, Get, Query } from '@nestjs/common';
import { notificationListData, searchQueryPoolData } from '../mock-data/commonData';
import wildCardSearch from '../utils/wildCardSearch';

@Controller()
export class CommonController {
  @Get('notifications/count')
  getNotificationsCount() {
    const unreadNotification = notificationListData.filter(
      (notification) => !notification.readed,
    );
    return { count: unreadNotification.length };
  }

  @Get('notifications')
  getNotifications() {
    return notificationListData;
  }

  @Get('search')
  search(@Query('query') query = '') {
    if (!query) {
      return [];
    }

    const result = wildCardSearch(searchQueryPoolData, query, 'title');
    const categories: string[] = [];

    result.forEach((elm) => {
      if (!categories.includes(elm.categoryTitle)) {
        categories.push(elm.categoryTitle);
      }
    });

    const data = categories.map((category) => {
      return {
        title: category,
        data: result
          .filter((elm) => elm.categoryTitle === category)
          .filter((_, index) => index < 5),
      };
    });

    return data;
  }
}
