import { Controller, Get } from '@nestjs/common';
import { calendarData } from '../mock-data/calendarData';

@Controller('calendar')
export class CalendarController {
  @Get()
  getCalendar() {
    return calendarData;
  }
}
