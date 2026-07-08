import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { EmailModule } from '@/email/email.module';
import { WhatsappModule } from '@/whatsapp/whatsapp.module';

@Module({
  imports: [EmailModule, WhatsappModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
