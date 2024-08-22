import { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { footerSection } from './sections/footer.section';

interface Countries {
  id: bigint;
  name: string | null;
  iso2: string;
  iso3: string | null;
  local_name: string | null;
  continent: string;
}

const formatCountryData = (country: Countries): TableCell[] => {
  const { id, iso2, iso3, name, local_name, continent } = country;
  return [
    id.toString(),
    iso2,
    iso3,
    { text: name || 'X', bold: true },
    local_name || 'X',
    continent || 'X',
  ];
};

export const getCountryReport = ({
  data,
}: {
  data: Countries[];
}): TDocumentDefinitions => {
  return {
    pageOrientation: 'portrait',
    header: headerSection({
      title: 'Countries Report',
      subTitlte: 'List of Countries',
    }),
    pageMargins: [40, 80, 40, 60],
    content: [
      {
        layout: 'customLayout01',
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', 100, '*', 'auto'],
          body: [
            [
              { text: 'ID',           bold: true, fontSize: 13 },
              { text: 'Nombre',       bold: true, fontSize: 13 },
              { text: 'iso2',         bold: true, fontSize: 13 },
              { text: 'iso3',         bold: true, fontSize: 13 },
              { text: 'Nombre Local', bold: true, fontSize: 13 },
              { text: 'Continente',   bold: true, fontSize: 13 },
            ],
            ...data.map(formatCountryData),
          ],
        },
        style: {
          alignment: 'center',
        },
      },
      {
        text:'Totales',
        margin:[0,40,0,0],
        style:{
          fontSize: 16,
          bold:true,
        }
      },
      {
        layout:'noBorders',
        table:{
          headerRows:1,
          body:[
            [
              {
                text:'Total de paises',
                bold:true
              },
              {
                text: data.length.toString() ,
                bold:true
              },
            ],
          ]
        }
      }
    ],
    footer:footerSection,
  };
};
