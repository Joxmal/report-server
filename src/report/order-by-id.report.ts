import type { Content, StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { CurrencyFormatter, DateFormatter } from 'src/helper';
import { footerSection } from './sections/footer.section';


export interface ReportValues{
  title?: string,
  subtitle?: string
  data: CompleteOrder
}
export interface CompleteOrder {
  order_id:      number;
  customer_id:   number;
  order_date:    Date;
  customers:     Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id:   number;
  customer_name: string;
  contact_name:  string;
  address:       string;
  city:          string;
  postal_code:   string;
  country:       string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id:        number;
  product_id:      number;
  quantity:        number;
  products:        Products;
}

export interface Products {
  product_id:   number;
  product_name: string;
  category_id:  number;
  unit:         string;
  price:        string;
}


const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin:[40,40]
};

const style:StyleDictionary={
  header:{
    fontSize:13,
    bold:true,
    marginTop:20,
  },
  subHeader:{
    fontSize:13,
    bold:true,
    margin:[0,20,0,0]
  }
}

export const orderByIdReport = (value:ReportValues): TDocumentDefinitions => {

  const {data,title,subtitle} = value
  const {customers,order_details} = data

  const subtotal = order_details.reduce(
    (acc,detail)=> 
      acc + (detail.quantity * +detail.products.price)
    ,0  
  )

  const total = subtotal * 1.16

  return {
    defaultStyle:{font:'Roboto'},
    styles:style,
    header:logo,
    pageMargins:[40,60,40,60],
    watermark: { text: 'Esto NO es una factura real', color: 'blue', opacity: 0.3, bold: true, italics: true },
    content: [
      {
        text:'Tucan Code',
        style:'header',
        marginBottom:10
      },
      {
        // background:'red',
        columns:[
          
          // { qr: 'text in QR', fit:90 },
          {text:
            `${customers.address}, Suite 100,\n${customers.city} ON K2Y 9X1, ${customers.country}\nBN: 12783671823\nhttps://portafolio-rose-one.vercel.app/`,
          },
          {text:[
            {text:`Recibo No#: ${data.order_id}`, bold:true, fontSize:13},
            `\nFecha del recibo: ${DateFormatter.getDDMMMMYYYY(data.order_date)}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY()}`,
          ],
            alignment:'right'
          }
        ]
      },

      //QR
      {
        columns:[
          {qr:`${data.order_id}`, alignment:'right', fit:75 },
        ]
      },
      

      //direccion del cliente
      {
        text:[
          {text:`Cobrar a: \n`,style:'subHeader'},
          `Razón social:${customers.contact_name}\n${customers.customer_name}\nCódigo Postal: ${customers.postal_code}`
          
        ]
      },
      //tabla del detalle de la orden
      {
        layout:'headerLineOnly',
        margin:[0,20],
        table:{
          headerRows:1,
          widths:[30,'*','auto','auto','auto',],
          body:[

            [
              {text:'ID', bold:true},
              {text:'Descripción', bold:true},
              {text:'Cantidad', bold:true},
              {text:'Precio', bold:true},
              {text:'Total', bold:true},
            ],

            ... order_details.map(order =>{
              return[
                `${order.product_id}`,
                `${order.products.product_name}`,
                `${order.quantity}`,
                {text:CurrencyFormatter.formatCurrency(+order.products.price),alignment:'right', bold:true},
                {text:CurrencyFormatter.formatCurrency(+order.products.price * +order.quantity),alignment:'right', bold:true},

              ]
            })


          ]
        }
      },
      //saltos de linea
      '\n\n',
      {
        columns:[
          {
            width:'*',
            text:''
          },
          {
            width:'auto',
            layout:'noBorders',
            table:{
              body:[
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(subtotal),
                    alignment:'right'
                  },
                ],
                [
                  'TOTAL',
                  {
                    text: CurrencyFormatter.formatCurrency(total),
                    alignment:'right',
                    bold:true,
                    fontSize:14
                  },
                ]
              ]
            }
          },

        ]
      }
    ],
    footer:footerSection
  }
}