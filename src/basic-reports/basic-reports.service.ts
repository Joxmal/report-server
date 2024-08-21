import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHellowordReport, getEmploymentLetterReport } from 'src/report';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
    
    async onModuleInit() {
      await this.$connect();
    //   console.log('conectados a la base de datos')
    }

    constructor(
        private printerService:PrinterService
    ){
        super()
    }

    helloword(){
        const docDefinition = getHellowordReport({name:'Jose'})

        const doc = this.printerService.createPdf(docDefinition)

        return doc
    }

    async employmentLetter(id:number){

        const trabajador = await this.employees.findUnique({
            where:{
                id
            }
        })
        if(!trabajador) throw new NotFoundException('no se encontro el trabajador')

        const docDefinition = getEmploymentLetterReport({dataEmployer:trabajador})

        const doc = this.printerService.createPdf(docDefinition)

        return doc
    }
  
    


}
