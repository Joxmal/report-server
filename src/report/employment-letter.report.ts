import type { Content, StyleDictionary, TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { DateFormatter } from "src/helper";

const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20]
  },
  body: {
    alignment: "justify",
    margin: [0, 0, 0, 70]
  },
  signature: {
    fontSize: 14,
    bold: true,
  }
}

interface DataEmployer {
  name: string,
  position: string,
  start_date: Date,
  work_time: Date,
  hours_per_day: number,
  work_schedule: String
}
interface Employer {
  dataEmployer: DataEmployer,
}

export const getEmploymentLetterReport = (dataEmployer: Employer): TDocumentDefinitions => {
  const employerName = 'José Montes'
  const employerPosition = 'Pana de Informática'
  const companie= 'JoxmalCodie,C.A'

  const {hours_per_day,name,position,start_date,work_schedule,work_time}= dataEmployer.dataEmployer

  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 40, 40, 60],

    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header' // referencia al style llamado header 
      },
      {
        text: `Yo, ${employerName} , en mi calidad de ${employerPosition} de ${companie}, por medio de la presente certifco que ${name} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMMMYYYY(start_date)} .\n
                Durante su empleo, el Sr./Sra. ${name} ha desempeñado el cargo de ${position}, demostrando responsabilidad, compromiso y habilidades profesionales en sus labores. \n
                La jornada laboral del Sr./ Sra. ${name} es de ${hours_per_day} horas semanales, con un horario de ${work_schedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa. \n
                Esta constancia se expide a solicitud del interesado para los fines que considere conveniente` ,
        style: 'body'
      },
      { text: `Atentamente`, style: 'signature' },
      { text: `${employerName}`, style: 'signature' },
      { text: `${employerPosition}`, style: 'signature' },
      { text: `${companie}`, style: 'signature' },
      { text: `${DateFormatter.getDDMMMMYYYY()}`, style: 'signature' },

    ],

    header: headerSection({}),
    
    footer: function (currentPage, PageCount) {
      return [
        { text: `Este documento es una constancia de empleo y no representa un compromiso laboral.`, alignment: 'center' },
        { text: currentPage.toString() + ` de ${PageCount}`, alignment: 'right', margin: [20, 20, 20, 20] },
      ]
    },



  }




  return docDefinition
}