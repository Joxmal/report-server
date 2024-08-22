import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { PrinterService } from 'src/printer/printer.service';
import {orderByIdReport } from 'src/report';

@Injectable()
export class StoreReportsService {

    constructor(
        private prisma:PrismaService,
        private printerService:PrinterService

    ){}


    getOrderReportByOrderId(orderId:number){
        console.log(orderId)
        const docDefinition = orderByIdReport();

        const doc = this.printerService.createPdf(docDefinition);
    
        return doc;
    }
}
