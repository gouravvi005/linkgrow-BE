import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { LinksRepository } from './links.repository';
import { CategoriesRepository } from './categories.repository';
import { ProfilesModule } from '@/profiles/profiles.module';

@Module({
  imports: [ProfilesModule],
  controllers: [LinksController],
  providers: [LinksService, LinksRepository, CategoriesRepository],
  exports: [LinksService, LinksRepository, CategoriesRepository],
})
export class LinksModule {}
