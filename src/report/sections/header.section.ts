import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helper';
import { text } from 'stream/consumers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 80,
  height: 80,
  alignment: 'left',
  marginBottom: 20,
};
interface HeaderOptions {
  title?: string;
  subTitlte?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { showDate = true, showLogo = true, subTitlte, title } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate
    ? {
        text: `${DateFormatter.getDDMMMMYYYY()}`,
        alignment: 'right',
        margin: [20, 40, 20, 20],
        width: 150,
      }
    : null;

  const headerSubTitle:Content = subTitlte
    ? {
        text:subTitlte,
        alignment: 'center',
        margin: [0, 2, 0, 0],

        style: {
          bold: true,
          
        },
      }
    : null

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            margin: [0, 15, 0, 0],
            alignment: 'center',
            style: {
              bold: true,
              fontSize:22,
            },
          },
          headerSubTitle

        ],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
