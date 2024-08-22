import type { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { DateFormatter } from 'src/helper';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin:[10,30]
};

const style:StyleDictionary={
  header:{
    fontSize:18,
    bold:true
  }
}

export const orderByIdReport = (): TDocumentDefinitions => {
  return {
    styles:style,
    header:logo,
    pageMargins:[40,60,40,60],
    content: [
      {
        text:'Tucan Code',
        style:'header'
      },
      {
        columns:[
          {text:`esta es una direccion aleatoria de calle qlq de x cosa con codigo postal 213131 y casa nRO 123 \n`},
          {text:`Recibo No. $1231313 \n Fecha del recibo ${DateFormatter.getDDMMMMYYYY()} \n pagar antes de ${DateFormatter.getDDMMMMYYYY()}`}
        ]
      }
    ]
  }
}