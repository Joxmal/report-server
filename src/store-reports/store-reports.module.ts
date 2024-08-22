import { Module } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { StoreReportsController } from './store-reports.controller';
import { PrismaService } from 'src/common/prisma.service';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  controllers: [StoreReportsController],
  providers: [StoreReportsService,PrismaService],
  imports:[PrinterModule]

})
export class StoreReportsModule {}
