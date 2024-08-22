import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}


  @Get('order-reports/:orderId')
  async getOrderReport(
    @Res() res:Response,
    @Param('orderId', ParseIntPipe) orderId:number
  ){

    const pdfDoc = await this.storeReportsService.getOrderReportByOrderId(orderId)

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'employment-Letter'
    pdfDoc.pipe(res)
    pdfDoc.end()
  }

}
