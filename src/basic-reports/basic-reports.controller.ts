import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  async hello(
    @Res() res:Response
  ){
    const pdfDoc = this.basicReportsService.helloword();

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola Mundo'
    pdfDoc.pipe(res)
    pdfDoc.end()

  }

  @Get('empleado/:id')
  async employmentLetter(
    @Res() res:Response,
    @Param('id', ParseIntPipe) id:number
  ){
    const pdfDoc = await this.basicReportsService.employmentLetter(id);
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'employment-Letter'
    pdfDoc.pipe(res)
    pdfDoc.end()
  }

  @Get('paises')
  async GetCountriesReport(
    @Res() res:Response,
  ){
    const pdfDoc = await this.basicReportsService.getCountries();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries-Report'
    pdfDoc.pipe(res)
    pdfDoc.end()
  }

}
