import { Injectable } from '@angular/core';
import { ImagePosition, Workbook } from 'exceljs';
import { IDataHeroExcel, IHeroTable } from '../models/excel.interface';
import * as fs from 'file-saver';
import { LOGO } from './logo';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private _workbook!:Workbook;
  
  async dowloadExcel(dataExcel:IDataHeroExcel):Promise<void>{
    this._workbook=new Workbook();
    this._workbook.creator='Vladimir';
    await this._createHeroTable(dataExcel.herosTable);
    this._workbook.xlsx.writeBuffer().then((data)=>{
      const blob=new Blob([data])
      fs.saveAs(blob,'HEROS.xlsx');
    })
  }

  private async _createHeroTable(dataExcel:IHeroTable[]):Promise<void>{
    const sheet=this._workbook.addWorksheet('HEROS');
    //Establecer el ancho y altura de la columna
    sheet.getColumn("B").width=21;
    sheet.getColumn("C").width=28;
    sheet.getColumn("D").width=35;
    sheet.getColumn("E").width=42;

    //insertando logo en la columna B
    //creamos un id con la imagen transformada en base64, LOGO constante
    const logoId=this._workbook.addImage({
      base64:LOGO,
      extension:'png'      
    });

    const position:ImagePosition={
      tl:{col:1.15,row:1.3},//col = indice la columna desde 0 1=B y .15 son 15mml a la izquierda, row = indice fila desde 0 1=2 y .3 son 3mml abajo 
      ext:{width:128,height:128}
    }

    sheet.addImage(logoId,position);
    
    //Agregar titulo por medio de una celda 
    const title =sheet.getCell("C5");
    title.value="HEROS";
    title.style.font={bold:true,size:24};

    //Agregar texto por medio de una fila
    const headerRow=sheet.getRow(10);//el indice empieza desde 1
    headerRow.values=['','Image','Full name','Eye Color','Hair Color','Work'];
    headerRow.font={bold:true,size:12};

    //Agregar valores de la api
    const rowsToInsert=sheet.getRows(11,dataExcel.length);
    console.log(dataExcel.length);
    for(let index=0;index<rowsToInsert!.length;index++){

      const itemData=dataExcel[index];//obtenemos el item segun el indice de la iteracion
      const row =rowsToInsert![index];//obtenemos la primera fila segun el indice de la iteracion

      //con los valores de item data seran asignados a row 
      row.values=[
        '',
        '',
        itemData.fullName,
        itemData.eyeColor,
        itemData.hairColor,
        itemData.work
      ]
      const idImage= await this._getIdImage(itemData.urlImage);
      sheet.addImage(idImage,{
        tl:{col:1,row:row.number-1},
        ext:{width:109,height:110}
      });

      row.height=92;
    }

  }

  private async _getIdImage(url:string):Promise<number>{
    const response=await fetch(url);
    const image=this._workbook.addImage({
      buffer:await response.arrayBuffer(),
      extension:'jpeg'
    })

    return image;

  }


  constructor() { }
}
