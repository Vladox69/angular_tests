import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexStroke,
  ApexDataLabels,
  ApexPlotOptions,
  ApexFill,
  ApexYAxis,
  ApexMarkers
} from "ng-apexcharts";
import { VISTAPROCESOS } from '../models/vistaprocesos';
import { ProcesosservicioService } from '../procesosservicio.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  colors: string[];
};

export type ChartOptionsCircle = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  labels: any;
};

export type ChartOptionsRadar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  xaxis: ApexXAxis;
};


@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  filterForm = new FormGroup({
    fromDate: new FormControl('',Validators.required),
    toDate: new FormControl('',Validators.required),
  });

  startDate:any;
  finalDate:any;
  primeraFecha:any;
  segundaFecha:any;
  fechafinal:any=this.filterForm.value.fromDate;
  buttonDisabled: boolean;

  private procesos:VISTAPROCESOS[]=[];

  public numeroDeSIE:String[]=[];
   public numeroDeCOTO:String[]=[];
   public numeroDeCDC:String[]=[];
   public numeroDeAFD:String[]=[];
   public numeroDeBID:String[]=[];
   public numeroDeRE:String[]=[];
   public numeroDeMCO:String[]=[];
   public numeroDeMCS:String[]=[];
   public numeroDeCOTS:String[]=[];
   public numeroDeLICO:String[]=[];
   public numeroDeFI:String[]=[];

   public numeroSIE:number=0;
   public numeroCOTO:number=0;
   public numeroCDC:number=0;
   public numeroAFD:number=0;
   public numeroBID:number=0;
   public numeroRE:number=0;
   public numeroMCO:number=0;
   public numeroMCS:number=0;
   public numeroCOTS:number=0;
   public numeroLICO:number=0;
   public numeroFI:number=0;


   public totalprocesos:number=0;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsCircle: Partial<ChartOptionsCircle>;
  public chartOptionsRadar: Partial<ChartOptionsRadar>;
  constructor(private procesosservicio:ProcesosservicioService,private  activatedRoute:ActivatedRoute) {
    this.chartOptions = {
      series: [
        {
          name: "Numero de Procesos",
          data: [0, 0,0,0, 0, 0, 0, 0, 0, 0,0]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Numero de Procesos"
      },
      xaxis: {
        categories: ["SIE", "COTO",  "CDC",  "AFD",  "BID",  "RE",  "MCO",  "MCS", "COTS","LICO","FI"]
      },
      colors: [
        "#008FFB",
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#D10CE8",
        "#008FFB",
        "#00E396",
        "#FEB019",
      ]
    };
    this.chartOptionsCircle={
      series: [0,0,0,0,0,0,0,0,0,0,1],
      chart: {
        width: 380,
        type: "pie"
      },
      title: {
        text: "Procesos"
      },
      labels: ["SIE", "COTO",  "CDC",  "AFD",  "BID",  "RE",  "MCO",  "MCS", "COTS","LICO","FI"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.chartOptionsRadar={
      series: [
        {
          name: "Series Procesos",
          data: [0,0,0,0,0,0,0,0,0,0,0]
        }
      ],
      chart: {
        height: 350,
        width:400,
        type: "radar"
      },
      title: {
        text: "Radar de Procesos"
      },
      xaxis: {
        categories: ["SIE", "COTO",  "CDC",  "AFD",  "BID",  "RE",  "MCO",  "MCS", "COTS","LICO","FI"]
    }
  }
    
    

   }

  ngOnInit(): void {
    this.getRemotedData();

    //this.obtenerValoresGrafico();
  }

  getRemotedData(){
    this.activatedRoute.params.subscribe(params=>{
      let stardate=params['startdate']
      let endDate=params['endDate']
      if(stardate && endDate){
        this.procesosservicio.getProcesosbyDate(stardate,endDate)
        .subscribe((response:any)=>{
          this.procesos=response;
          for(const cate of this.procesos){
            if(cate.intpro_ABREV==="SIE"){
              this.numeroDeSIE.push(cate.intpro_ABREV);
              this.numeroSIE=this.numeroDeSIE.length;
            }
            if(cate.intpro_ABREV==="COTO"){
              this.numeroDeCOTO.push(cate.intpro_ABREV);
              this.numeroCOTO=this.numeroDeCOTO.length;
            }
            if(cate.intpro_ABREV==="CDC"){
              this.numeroDeCDC.push(cate.intpro_ABREV);
              this.numeroCDC=this.numeroDeCDC.length;
            }
            if(cate.intpro_ABREV==="AFD"){
              this.numeroDeAFD.push(cate.intpro_ABREV);
              this.numeroAFD=this.numeroDeAFD.length;
            }
            if(cate.intpro_ABREV==="BID"){
              this.numeroDeBID.push(cate.intpro_ABREV);
              this.numeroBID=this.numeroDeBID.length;
            }
            if(cate.intpro_ABREV==="RE"){
              this.numeroDeRE.push(cate.intpro_ABREV);
              this.numeroRE=this.numeroDeRE.length;
            }
            if(cate.intpro_ABREV==="MCO"){
              this.numeroDeMCO.push(cate.intpro_ABREV);
              this.numeroMCO=this.numeroDeMCO.length;
            }
            if(cate.intpro_ABREV==="MCS"){
              this.numeroDeMCS.push(cate.intpro_ABREV);
              this.numeroMCS=this.numeroDeMCS.length;
            }
            if(cate.intpro_ABREV==="COTS"){
              this.numeroDeCOTS.push(cate.intpro_ABREV);
              this.numeroCOTS=this.numeroDeCOTS.length;
            }
            if(cate.intpro_ABREV==="LICO"){
              this.numeroDeLICO.push(cate.intpro_ABREV);
              this.numeroLICO=this.numeroDeLICO.length;
            }
            if(cate.intpro_ABREV==="FI"){
              this.numeroDeFI.push(cate.intpro_ABREV);
              this.numeroFI=this.numeroDeFI.length;
            }
            this.chartOptions = {
              series: [
                {
                  name: "Numero de Procesos",
                  data: [this.numeroSIE, this.numeroCOTO, this.numeroCDC, this.numeroAFD, this.numeroBID, this.numeroRE, this.numeroMCO, this.numeroMCS,this.numeroCOTS,
                  this.numeroLICO,this.numeroFI]
                }
              ],
              chart: {
                height: 350,
                type: "bar"
              },
              title: {
                text: "Numero de Procesos"
              },
              xaxis: {
                categories: ["SIE", "COTO",  "CDC",  "AFD",  "BID",  "RE",  "MCO",  "MCS", "COTS","LICO","FI"]
              },
              colors: [
                "#008FFB",
                "#00E396",
                "#FEB019",
                "#FF4560",
                "#775DD0",
                "#546E7A",
                "#26a69a",
                "#D10CE8",
                "#008FFB",
                "#00E396",
                "#FEB019",
              ]
            };
            this.chartOptionsCircle={
              series: [this.numeroSIE,this.numeroCOTO,this.numeroCDC,this.numeroAFD,this.numeroBID,this.numeroRE,this.numeroMCO,
              this.numeroMCS,this.numeroCOTS,this.numeroLICO,this.numeroFI],
              chart: {
                width: 450,
                type: "pie"
              },
              title: {
                text: "Numero de Procesos %"
              },
              labels: ["SIE", "COTO",  "CDC",  "AFD",  "BID",  "RE",  "MCO",  "MCS", "COTS","LICO","FI"],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 500
                    },
                    legend: {
                      position: "bottom"
                    }
                  }
                }
              ]
            };
            this.chartOptionsRadar={
              series: [
                {
                  name: "Series Procesos",
                  data: [this.numeroSIE,this.numeroCOTO,this.numeroCDC,this.numeroAFD,this.numeroBID,this.numeroRE,this.numeroMCO,
                    this.numeroMCS,this.numeroCOTS,this.numeroLICO,this.numeroFI]
                }
              ],
              chart: {
                height: 350,
                width:400,
                type: "radar"
              },
              title: {
                text: "Radar de Procesos"
              },
              xaxis: {
                categories: ["SIE", "COTO",  "CDC",  "AFD",  "BID",  "RE",  "MCO",  "MCS", "COTS","LICO","FI"]
            }
          }
            
          }
          

        })
      }
    })
  }

  vaciarListas(){
    this.numeroDeSIE=[];
    this.numeroDeCOTO=[];
    this.numeroDeCDC=[];
    this.numeroDeAFD=[];
    this.numeroDeBID=[];
    this.numeroDeRE=[];
    this.numeroDeMCO=[];
    this.numeroDeMCS=[];
    this.numeroDeCOTS=[];
    this.numeroDeLICO=[];
    this.numeroDeFI=[];
    this.numeroSIE=0;
    this.numeroCOTO=0;
    this.numeroCDC=0;
    this.numeroAFD=0;
    this.numeroBID=0;
    this.numeroRE=0;
    this.numeroMCO=0;
    this.numeroMCS=0;
    this.numeroCOTS=0;
    this.numeroLICO=0;
    this.numeroFI=0;
  }
  obtenerValoresGrafico(){
    this.numeroSIE=this.numeroDeSIE.length;
  }

  guardarFechasyTotal(){
    this.primeraFecha=this.startDate;
    this.segundaFecha=this.finalDate;
    this.totalprocesos=this.numeroSIE+this.numeroCOTO+this.numeroCDC+this.numeroAFD+this.numeroBID+
    this.numeroRE+this.numeroMCO+this.numeroMCS+this.numeroCOTS+this.numeroLICO+this.numeroFI;
  }

}
