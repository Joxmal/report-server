import { Content } from "pdfmake/interfaces";
interface Page {
    currentPage:number,
    PageCount:number,
    title?:string
}

export const footerSection=(page:Page):Content=>{
    const {PageCount,currentPage, title} = page
    return [
        { text: `${title}`, alignment: 'center' },
        { text:`Página ${currentPage.toString()} de ${PageCount}`, alignment: 'right', margin: [20, 20, 20, 20] },
    ]
}