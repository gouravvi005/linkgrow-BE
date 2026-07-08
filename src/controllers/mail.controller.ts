import { Controller, Get, Param, Query } from '@nestjs/common';
import { mailData } from '../mock-data/mailData';

@Controller('mail')
export class MailController {
  @Get('list')
  getMailList(
    @Query('category') category?: string,
    @Query('label') label?: string,
  ) {
    let response = mailData;

    if (category && category !== 'inbox') {
      response = mailData.filter((mail) => mail.group === category);
    }

    if (label) {
      response = mailData.filter((mail) => mail.label === label);
    }

    return response;
  }

  @Get(':id')
  getMailById(@Param('id') id: string) {
    const mail = mailData.find((m) => m.id === id);
    return mail || {};
  }

  @Get()
  getMailQuery(@Query('mail') mailId?: string) {
    if (mailId) {
      const mail = mailData.find((m) => m.id === mailId);
      return mail || {};
    }
    return mailData;
  }
}
