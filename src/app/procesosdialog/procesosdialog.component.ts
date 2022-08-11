import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportesfiltradosComponent } from '../reportesfiltrados/reportesfiltrados.component';

@Component({
  selector: 'app-procesosdialog',
  templateUrl: './procesosdialog.component.html',
  styleUrls: ['./procesosdialog.component.css']
})
export class ProcesosdialogComponent implements OnInit {
  public recibidonumerointres_Detalle:String[]=[];
  public recibodonumerointres_Detalle_Cancelado:String[]=[];
  public recibidonumerointres_Detalle_Desierto:String[]=[];
  public recibidonumerointres_Detalle_NoUtilizado:String[]=[];
  public recibidonumerointres_Total_Detalle:String[]=[];
  public recibidonumeroSIE:String[]=[];
  public recibidonumeroDeCOTO:String[]=[];
  public recibidosnumeroDeCDC:String[]=[];
  public recibidonumeroDeAFD:String[]=[];
  public recibidonumeroDeBID:String[]=[];
  public recibidonumeroDeRE:String[]=[];
  public recibidonumeroDeMCO:String[]=[];
  public recibidonumerodeMCS:String[]=[];
  public recibidonumeroDeCOTS:String[]=[];
  public recibidonumeroDeLICO:String[]=[];
  public recibidonumeroDeFI:String[]=[];
  public recibidonumeroTotalProcesos:String[]=[];

  public recibidovalorontratadoSIE:any[]=[];
  public recibidovalorcontratadoCOTO:any[]=[];
  public recibidovalorcontratadoCDC:any[]=[];
  public recibidovalorcontratadoAFD:any[]=[];
  public recibidovalorcontratadoBID:any[]=[];
  public recibidovalorcontratadoRE:any[]=[];
  public recibidovalorcontratadoMCO:any[]=[];
  public recibidovalorcontratadoMCS:any[]=[];
  public recibidovalorcontratadoCOTS:any[]=[];
  public recibidovalorcontratadoLICO:any[]=[];
  public recibidovalorcontratadoFI:any[]=[];

  public sumSIE:any;
  public sumCOTO:any;
  public sumCDC:any;
  public sumAFD:any;
  public sumBID:any;
  public sumRE:any;
  public sumMCO:any;
  public sumMCS:any;
  public sumCOTS:any;
  public sumLICO:any;
  public sumFI:any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
   }

  ngOnInit(): void {
    this.getDatos();
    
  }
  getDatos(){
    this.recibidonumerointres_Detalle=this.data.numerointres_Detalle;
    this.recibodonumerointres_Detalle_Cancelado=this.data.numerointres_Detalle_Cancelado;
    this.recibidonumerointres_Detalle_Desierto=this.data.numerointres_Detalle_Desierto;
    this.recibidonumerointres_Detalle_NoUtilizado=this.data.numereointres_DETALLE_NO_UTILIZADO,
    //var arrayTEMP=this.recibidonumerointres_Detalle.concat(this.recibodonumerointres_Detalle_Cancelado
      //,this.recibidonumerointres_Detalle_NoUtilizado,this.recibidonumerointres_Detalle_Desierto);
    this.recibidonumerointres_Total_Detalle=this.recibidonumerointres_Detalle.concat(this.recibodonumerointres_Detalle_Cancelado
      ,this.recibidonumerointres_Detalle_NoUtilizado,this.recibidonumerointres_Detalle_Desierto);

    this.recibidonumeroSIE=this.data.numeroSIE;
    this.recibidonumeroDeCOTO=this.data.numeroDeCOTO;
    this.recibidosnumeroDeCDC=this.data.numeroDeCDC;
    this.recibidonumeroDeAFD=this.data.numeroDeAFD;
    this.recibidonumeroDeBID=this.data.numeroDeBID;
    this.recibidonumeroDeRE=this.data.numeroDeRE;
    this.recibidonumeroDeMCO=this.data.numeroDeMCO;
    this.recibidonumerodeMCS=this.data.numeroDeMCS;
    this.recibidonumeroDeCOTS=this.data.numeroDeCOTS;
    this.recibidonumeroDeLICO=this.data.numeroDeLICO;
    this.recibidonumeroDeFI=this.data.numeroDeFI;
    this.recibidonumeroTotalProcesos=this.recibidonumeroSIE.concat(this.recibidonumeroDeCOTO,
      this.recibidosnumeroDeCDC,this.recibidonumeroDeAFD,this.recibidonumeroDeBID,this.recibidonumeroDeRE,this.recibidonumeroDeMCO,
      this.recibidonumerodeMCS,this.recibidonumeroDeCOTS,this.recibidonumeroDeLICO,this.recibidonumeroDeFI);
    
    
  }

  getValoresContratados(){
    this.sumSIE=0;
    this.recibidovalorontratadoSIE=this.data.valorontratadoSIE;
    for(let i=0;i<this.recibidovalorontratadoSIE.length;i++){
      this.sumSIE+=this.recibidovalorontratadoSIE[i];
    }
    return this.sumSIE;
  }
  getValoresContratadosCOTO(){
    this.sumCOTO=0;
    this.recibidovalorcontratadoCOTO=this.data.valorcontratadoCOTO;
    for(let i=0;i<this.recibidovalorcontratadoCOTO.length;i++){
      this.sumCOTO+=this.recibidovalorcontratadoCOTO[i];
    }
    return this.sumCOTO;
  }
  getValoresContratadosCDC(){
    this.sumCDC=0;
    this.recibidovalorcontratadoCDC=this.data.valorcontratadoCDC;
    for(let i=0;i<this.recibidovalorcontratadoCDC.length;i++){
      this.sumCDC+=this.recibidovalorcontratadoCDC[i];
    }
    return this.sumCDC;
  }
  getValoresContratadosAFD(){
    this.sumAFD=0;
    this.recibidovalorcontratadoAFD=this.data.valorcontratadoAFD;
    for(let i=0;i<this.recibidovalorcontratadoAFD.length;i++){
      this.sumAFD+=this.recibidovalorcontratadoAFD[i];
    }
    return this.sumAFD;
  }
  getValoresContratadosBID(){
    this.sumBID=0;
    this.recibidovalorcontratadoBID=this.data.valorcontratadoBID;
    for(let i=0;i<this.recibidovalorcontratadoBID.length;i++){
      this.sumBID+=this.recibidovalorcontratadoBID[i];
    }
    return this.sumBID;
  }
  getValoresContratadosRE(){
    this.sumRE=0;
    this.recibidovalorcontratadoRE=this.data.valorcontratadoRE;
    for(let i=0;i<this.recibidovalorcontratadoRE.length;i++){
      this.sumRE+=this.recibidovalorcontratadoRE[i]
    }
    return this.sumRE;
  }
  getValoresContratadosMCO(){
    this.sumMCO=0;
    this.recibidovalorcontratadoMCO=this.data.valorcontratadoMCO;
    for(let i=0;i<this.recibidovalorcontratadoMCO.length;i++){
      this.sumMCO+=this.recibidovalorcontratadoMCO[i];
    }
    return this.sumMCO;
    }
  getValoresContratadosMCS(){
    this.sumMCS=0;
    this.recibidovalorcontratadoMCS=this.data.valorcontratadoMCS;
    for(let i=0;i<this.recibidovalorcontratadoMCS.length;i++){
      this.sumMCS+=this.recibidovalorcontratadoMCS[i];
    }
    return this.sumMCS;
  }
  getValoresContratadosCOTS(){
    this.sumCOTS=0;
    this.recibidovalorcontratadoCOTS=this.data.valorcontratadoCOTS;
    for(let i=0;i<this.recibidovalorcontratadoCOTS.length;i++){
      this.sumCOTS+=this.recibidovalorcontratadoCOTS[i];
    }
    return this.sumCOTS;
  }

  getValoresContratadosLICO(){
    this.sumLICO=0;
    this.recibidovalorcontratadoLICO=this.data.valorcontratadoLICO;
    for(let i=0;i<this.recibidovalorcontratadoLICO.length;i++){
      this.sumLICO+=this.recibidovalorcontratadoLICO[i];
    }
    return this.sumLICO;
  }
  getValoresContratadosFI(){
    this.sumFI=0;
    this.recibidovalorcontratadoFI=this.data.valorcontratadoFI;
    for(let i=0;i<this.recibidovalorcontratadoFI.length;i++){
      this.sumFI+=this.recibidovalorcontratadoFI[i];
    }
    return this.sumFI;
  }
  getTotalValoresContratados(){
    const total=this.sumSIE+this.sumCOTO+this.sumCDC+this.sumAFD+this.sumBID+this.sumRE+this.sumMCO+this.sumMCS+
    this.sumCOTS+this.sumLICO+this.sumFI;
    return total;
    
  }

}
