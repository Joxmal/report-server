import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helper";

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 80,
  height: 80,
  alignment: 'left',
  marginBottom: 20,
}
interface HeaderOptions {
  title?: string,
  subTitlte?: string,
  showLogo?: boolean,
  showDate?: boolean,
}


export const headerSection = (options: HeaderOptions): Content => {

  const {showDate=true,showLogo=true,subTitlte,title}= options;

  const headerLogo:Content = showLogo ? logo : null
  const headerDate:Content = showDate ? {
    text:`${DateFormatter.getDDMMMMYYYY()}`,
    alignment: 'right',
    margin: [20, 20, 20, 20]
  }
  : null

  const headerTitle:Content = title 
    ? {
      text:title,
      style:{
        bold:true,
        alignment:"right"
      }
    }
  : null


  return {
    columns: [headerLogo,headerTitle,headerDate]
  }

}