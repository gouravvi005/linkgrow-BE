import { Controller, Get, Query } from '@nestjs/common';
import { logData } from '../mock-data/logData';

@Controller('logs')
export class LogController {
  @Get()
  getLogs(
    @Query('activityIndex') activityIndex = '1',
    @Query('filter') filter?: string | string[],
  ) {
    const page = parseInt(activityIndex);
    let loadable = true;
    const maxGetItem = 3;
    const count = (page - 1) * maxGetItem;
    let logs = logData;

    if (count >= logs.length) {
      loadable = false;
    }
    logs = logs.slice(count, page * maxGetItem);

    if (filter) {
      const filters = Array.isArray(filter) ? filter : [filter];
      logs = structuredClone(logs).map((log: any) => {
        log.events = log.events.filter((event: any) =>
          filters.includes(event.type),
        );
        return log;
      });
    }

    return {
      data: logs,
      loadable,
    };
  }
}
