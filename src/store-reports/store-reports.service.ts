import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { PrinterService } from 'src/printer/printer.service';
import {orderByIdReport } from 'src/report';
import { json } from 'stream/consumers';

@Injectable()
export class StoreReportsService {

    constructor(
        private prisma:PrismaService,
        private printerService:PrinterService

    ){}


    async getOrderReportByOrderId(orderId:number){
      
      const order1 = await this.prisma.orders.findUnique({
        where:{
          order_id:orderId
        },
        include:{
          customers:true,
          order_details:{
            include:{
              products:true
            }
          },
        }
      })
      

      if(!order1){
        throw new NotFoundException(`orden Nro ${orderId} no encontrada`)
      }

      // console.log(orderId)
      // const order2 = await this.prisma.orders.findMany({
      //   where:{
      //     order_id:orderId
      //   },
      //   include:{
      //     customers:true,
      //     order_details:{
      //       include:{
      //         products:true
      //       }
      //     },
      //     _count:true
      //   }
      // })

      // console.log(order2)


      const docDefinition = orderByIdReport({
        title:'orden de producto',
        data:order1 as any
      });

      const doc = this.printerService.createPdf(docDefinition);
  
      return doc;
    }
}
