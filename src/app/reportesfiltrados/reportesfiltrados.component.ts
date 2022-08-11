import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ProcesosservicioService } from '../procesosservicio.service';
import Swal from 'sweetalert2';
import { TableUtil } from '../reportesservicio/tableUtil';
import { VISTAPROCESOS } from '../models/vistaprocesos';
import { tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProcesosdialogComponent } from '../procesosdialog/procesosdialog.component';

@Component({
  selector: 'app-reportesfiltrados',
  templateUrl: './reportesfiltrados.component.html',
  styleUrls: ['./reportesfiltrados.component.css']
})
export class ReportesfiltradosComponent implements OnInit {


  filterForm = new FormGroup({
    fromDate: new FormControl('',Validators.required),
    toDate: new FormControl('',Validators.required),
  });

  departametos=[
    {INTDEP_CODIGO:'DEMEOR1',INTDEP_DESCRIPCION:'PRESIDENCIA EJECUTIVA',},
    {INTDEP_CODIGO:'DEMEOR10',INTDEP_DESCRIPCION:'DZO PASTAZA',},
    {INTDEP_CODIGO:'DEMEOR11',INTDEP_DESCRIPCION:'DZO NAPO',},
    {INTDEP_CODIGO:'DEMEOR162',INTDEP_DESCRIPCION:'DEPARTAMENTO DE DISTRIBUCION',},
    {NTDEP_CODIGO:'DEMEOR163',INTDEP_DESCRIPCION:'DEPARTAMENTO DE SUBTRANSMISION',},
    {INTDEP_CODIGO:'DEMEOR2',INTDEP_DESCRIPCION:'UNIDAD DE AUDITORIA INTERNA',},
    {INTDEP_CODIGO:'DEMEOR4',INTDEP_DESCRIPCION:'DEPARTAMENTO DE PLANIFICACION',},
    {INTDEP_CODIGO:'DEMEOR5',INTDEP_DESCRIPCION:'DPTO.DE RELACIONES INDUSTRIALES',},
    {INTDEP_CODIGO:'DEMEOR6',INTDEP_DESCRIPCION:'DEPARTAMENTO FINANCIERO',},
    {INTDEP_CODIGO:'DEMEOR7',INTDEP_DESCRIPCION:'DPTO.COMERCIAL',},
    {INTDEP_CODIGO:'DEMEOR8',INTDEP_DESCRIPCION:'DPTO. OPERACION Y MANTENIMIENTO',},
    {INTDEP_CODIGO:'DEMEOR9',INTDEP_DESCRIPCION:'DPTO.DISEÑO Y CONSTRUCCION',},
    {INTDEP_CODIGO:'11',INTDEP_DESCRIPCION:'AJ',},
    {INTDEP_CODIGO:'12',INTDEP_DESCRIPCION:'CNEL BOLIVAR',},
  ]

  startDate:any;
  finalDate:any;
  starDateEnviar:any;
  finalDateEnviar:any;

  fechafinal:any=this.filterForm.value.fromDate;
  buttonDisabled: boolean;

  columnsToDisplay = ['INTRP_FECHA_PUBLICACION','INTPRO_DESCRIPCION','INTPRO_ABREV','INTRP_NUMEROPROCESO',
  'INTRP_CODIGOPROCESO','INTRP_DETALLE','INTRES_DETALLE','INTRP_NUMOFICIO','MA_CONT_RAZON_SOCIAL',
    'CONTRAF_NUMERO_CONTRATO','CONTRAF_VALOR_CONTRATO','INTDEP_DESCRIPCION'];
    displayedTotalColumns = ['INTRP_FECHA_PUBLICACION','INTPRO_DESCRIPCION'];
   public dataSource:any= new MatTableDataSource();
   public dataSourceFilter:any=new MatTableDataSource();
   public filterValues = {};
   public filterSelectObj = [];
   public procesos:VISTAPROCESOS[];
   public total:number=20;
   show = true;


   public procesosSIE:VISTAPROCESOS[];
   public procesosSIEFilter:VISTAPROCESOS[];
   
   public procesosCOTO:VISTAPROCESOS[];
   public procesosCOTOFilter:VISTAPROCESOS[];

   public procesosCDC:VISTAPROCESOS[];
   public procesosCDCFilter:VISTAPROCESOS[];
   
   public procesosAFD:VISTAPROCESOS[];
   public procesosAFDFilter:VISTAPROCESOS[];
   
   public procesosBID:VISTAPROCESOS[];
   public procesosBIDFilter:VISTAPROCESOS[];
   
   public procesosRE:VISTAPROCESOS[];
   public procesosREFilter:VISTAPROCESOS[];
   
   public procesosMCO:VISTAPROCESOS[];
   public procesosMCOFilter:VISTAPROCESOS[];
   
   public procesosMCS:VISTAPROCESOS[];
   public procesosMCSFilter:VISTAPROCESOS[];

   public procesosCOTS:VISTAPROCESOS[];
   public procesosCOTSFilter:VISTAPROCESOS[];
   
   public procesosLICO:VISTAPROCESOS[];
   public procesosLICOFilter:VISTAPROCESOS[];
   
   public procesosFI:VISTAPROCESOS[];
   public procesosFIFilter:VISTAPROCESOS[];

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

   public numerointres_DETALLE:String[]=[];
   public numerointres_DETALLE_DESIERTO:String[]=[];
   public numerointres_DETALLE_CANCELADO:String[]=[];
   public numereointres_DETALLE_NO_UTILIZADO:String[]=[];

   public valorontratadoSIE:any[]=[];
   public valorcontratadoCOTO:any[]=[];
   public valorcontratadoCDC:any[]=[];
   public valorcontratadoAFD:any[]=[];
   public valorcontratadoBID:any[]=[];
   public valorcontratadoRE:any[]=[];
   public valorcontratadoMCO:any[]=[];
   public valorcontratadoMCS:any[]=[];
   public valorcontratadoCOTS:any[]=[];
   public valorcontratadoLICO:any[]=[];
   public valorcontratadoFI:any[]=[]; 


   public checkedSIE= false;
   public checkedCOTO=false;
   public checkedCDC=false;
   public checkedAFD=false;
   public checkedBID=false;
   public checkedRE=false;
   public checkedMCO=false;
   public checkedMCS=false;
   public checkedCOTS=false;
   public checkedLICO=false;
   public checkedFI=false;


   public adjudicadosSIE:any[]=[];
   public auxSIEAdjudicados:any[]=[];
   public cantidadAdjudicadosSIE:number=0;

   public adjudicadosCOTO:any[]=[];
   public auxCOTOAdjudicados:any[]=[];
   public cantidadAdjudicadosCOTO:number=0;

  public adjudicadosCDC:any[]=[];
  public auxCDCAdjudicados:any[]=[];
  public cantidadAdjudicadosCDC:number=0;

  public adjudicadosAFD:any[]=[];
  public auxAFDAdjudicados:any[]=[];
  public cantidadAdjudicadosAFD:number=0;

  public adjudicadosBID:any[]=[];
  public auxBIDAdjudicados:any[]=[];
  public cantidadAdjudicadosBID:number=0;

  public adjudicadosRE:any[]=[];
  public auxREAdjudicados:any[]=[];
  public cantidadAdjudicadosRE:number=0;

  public adjudicadosMCO:any[]=[];
  public auxMCOAdjudicados:any[]=[];
  public cantidadAdjudicadosMCO:number=0;

  public adjudicadosMCS:any[]=[];
  public auxMCSAdjudicados:any[]=[];
  public cantidadAdjudicadosMCS:number=0;

  public adjudicadosCOTS:any[]=[];
  public auxCOTSadjudicados:any[]=[];
  public cantidadAdjudicadosCOTS:number=0;

  public adjudicadosLICO:any[]=[];
  public auxLICOadjudicados:any[]=[];
  public cantidadAdjudicadosLICO:number=0;

  public adjudicadosFI:any[]=[];
  public auxFIadjudicados:any[]=[];
  public cantidadAdjudicadosFI:number=0;


  public desiertosSIE:any[]=[];
  public auxSIEDesiertos:any[]=[];
  public cantidadDesiertosSIE:number=0;

  public desiertosCOTO:any[]=[];
  public auxCOTODesiertos:any[]=[];
  public cantidadDesiertosCOTO:number=0;

  public desiertosCDC:any[]=[];
  public auxCDCDesiertos:any[]=[];
  public cantidadDesiertosCDC:number=0;

  public desiertosAFD:any[]=[];
  public auxAFDDesiertos:any[]=[];
  public cantidadDesiertosAFD:number=0;

  public desiertosBID:any[]=[];
  public auxBIDDesiertos:any[]=[];
  public cantidadDesiertosBID:number=0;

  public desiertosRE:any[]=[];
  public auxREDesiertos:any[]=[];
  public cantidadDesiertosRE:number=0;

  public desiertosMCO:any[]=[];
  public auxMCODesiertos:any[]=[];
  public cantidadDesiertosMCO:number=0;

  public desiertosMCS:any[]=[];
  public auxMCSDesiertos:any[]=[];
  public cantidadDesiertosMCS:number=0;

  public desiertosCOTS:any[]=[];
  public auxCOTSDesiertos:any[]=[];
  public cantidadDesiertosCOTS:number=0;

  public desiertosLICO:any[]=[];
  public auxLICODesiertos:any[]=[];
  public cantidadDesiertosLICO:number=0;

  public desiertosFI:any[]=[];
  public auxFIDesiertos:any[]=[];
  public cantidadDesiertosFI:number=0;

  public canceladosSIE:any[]=[];
  public auxSIECancelados:any[]=[];
  public cantidadCanceladosSIE:number=0;

  public canceladosCOTO:any[]=[];
  public auxCOTOCancelados:any[]=[];
  public cantidadCanceladosCOTO:number=0;

  public canceladosCDC:any[]=[];
  public auxCDCCancelados:any[]=[];
  public cantidadCanceladosCDC:number=0;

  public canceladosAFD:any[]=[];
  public auxAFDCancelados:any[]=[];
  public cantidadCanceladosAFD:number=0;

  public canceladosBID:any[]=[];
  public auxBIDCancelados:any[]=[];
  public cantidadCanceladosBID:number=0;

  public canceladosRE:any[]=[];
  public auxRECancelados:any[]=[];
  public cantidadCanceladosRE:number=0;

  public canceladosMCO:any[]=[];
  public auxMCOCancelados:any[]=[];
  public cantidadCanceladosMCO:number=0;

  public canceladosMCS:any[]=[];
  public auxMCSCancelados:any[]=[];
  public cantidadCanceladosMCS:number=0;

  public canceladosCOTS:any[]=[];
  public auxCOTSCancelados:any[]=[];
  public cantidadCanceladosCOTS:number=0;

  public canceladosLICO:any[]=[];
  public auxLICOCancelados:any[]=[];
  public cantidadCanceladosLICO:number=0;

  
  public canceladosFI:any[]=[];
  public auxFICancelados:any[]=[];
  public cantidadCanceladosFI:number=0;

  public noUtilizadosSIE:any[]=[];
  public auxSIENoutilizados:any[]=[];
  public cantidadNoutilizadosSIE:number=0;

  public noUtilizadosCOTO:any[]=[];
  public auxCOTONoUtilizados:any[]=[];
  public cantidadNoutilizadosCOTO:number=0;

  public noUtilizadosCDC:any[]=[];
  public auxCDCNoUtilizados:any[]=[];
  public cantidadNoutilizadosCDC:number=0;

  public noUtilizadosAFD:any[]=[];
  public auxAFDNoUtilizados:any[]=[];
  public cantidadNoutilizadosAFD:number=0;

  public noUtilizadosBID:any[]=[];
  public auxBIDNoUtilizados:any[]=[];
  public cantidadNoutilizadosBID:number=0;

  public noUtilizadosRE:any[]=[];
  public auxRENoUtilizados:any[]=[];
  public cantidadNoutilizadosRE:number=0;

  public noUtilizadosMCO:any[]=[];
  public auxMCONoUtilizados:any[]=[];
  public cantidadNoutilizadosMCO:number=0;

  public noUtilizadosMCS:any[]=[];
  public auxMCSNoUtilizados:any[]=[];
  public cantidadNoutilizadosMCS:number=0;

  public noUtilizadosCOTS:any[]=[];
  public auxCOTSNoUtilizados:any[]=[];
  public cantidadNoutilizadosCOTS:number=0;

  public noUtilizadosLICO:any[]=[];
  public auxLICONoUtilizados:any[]=[];
  public cantidadNoutilizadosLICO:number=0;
  
 
  selectedTipo:any;
  select_departamento:string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  constructor(private procesosservicio:ProcesosservicioService,private  activatedRoute:ActivatedRoute,public dialog: MatDialog) { 

    this.filterSelectObj=[
      {
        name: 'Proceso',
        columnProp: 'intpro_ABREV',
        options: []
      }
    ]
  }

  ngOnInit(): void {
    this.getRemoteData();
    // Overrride default filter behaviour of Material Datatable
    this.dataSource.filterPredicate = this.createFilter();
    this.calculacionTotal();
  }
  /**
   * Given an array of objects, return an array of unique values for a given key
   * @param fullObj - The full array of objects to be filtered.
   * @param key - The key to check for uniqueness.
   * @returns An array of unique values from the key in the object.
   */
   getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
    
  }

  getRemoteData(){
    this.activatedRoute.params.subscribe(params=>{
      let startdate=params['startdate']
      let endDate=params['endDate']
      if(startdate && endDate){
        this.procesosservicio.getProcesosbyDate(startdate,endDate).pipe(
          tap(respuesta=>{
            (respuesta as VISTAPROCESOS[]).forEach(procesos=>{
              
            })
          })
        )
        .subscribe((response:any)=>{
          this.procesos=response;        
          this.procesosSIE=this.procesos.filter(proceso=>proceso.intpro_ABREV==="SIE");
          this.procesosSIEFilter=this.procesosSIE;
          this.procesosCOTO=this.procesos.filter(proceso=>proceso.intpro_ABREV==="COTO");
          this.procesosCOTOFilter=this.procesosCOTO;
          this.procesosCDC=this.procesos.filter(proceso=>proceso.intpro_ABREV==="CDC");
          this.procesosCDCFilter=this.procesosCDC;
          this.procesosAFD=this.procesos.filter(proceso=>proceso.intpro_ABREV==="AFD");
          this.procesosAFDFilter=this.procesosAFD;
          this.procesosRE=this.procesos.filter(proceso=>proceso.intpro_ABREV==="RE");
          this.procesosREFilter=this.procesosRE;
          this.procesosBID=this.procesos.filter(proceso=>proceso.intpro_ABREV==="BID")
          this.procesosBIDFilter=this.procesosBID;
          this.procesosMCO=this.procesos.filter(proceso=>proceso.intpro_ABREV==="MCO");
          this.procesosMCOFilter=this.procesosMCO;
          this.procesosMCS=this.procesos.filter(proceso=>proceso.intpro_ABREV==="MCS");
          this.procesosMCSFilter=this.procesosMCS;
          this.procesosCOTS=this.procesos.filter(proceso=>proceso.intpro_ABREV==="COTS");
          this.procesosCOTSFilter=this.procesosCOTS;
          this.procesosLICO=this.procesos.filter(proceso=>proceso.intpro_ABREV==="LICO");
          this.procesosLICOFilter=this.procesosLICO;
          this.procesosFI=this.procesos.filter(proceso=>proceso.intpro_ABREV==="FI");
          this.procesosFIFilter=this.procesosFI;
          this.auxSIEAdjudicados=this.procesos.filter(proceso=>{
            if(proceso.intpro_ABREV==="SIE" && proceso.intres_DETALLE==="ADJUDICADO"){
              this.adjudicadosSIE.push(this.auxSIEAdjudicados);
            }
          })

        this.auxCOTOAdjudicados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="COTO" && proceso.intres_DETALLE==="ADJUDICADO"){
            this.adjudicadosCOTO.push(this.auxCOTOAdjudicados);
          }
        })

        this.auxCDCAdjudicados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="CDC" && proceso.intres_DETALLE==="ADJUDICADO"){
            this.adjudicadosCDC.push(this.auxCDCAdjudicados);
          }
        })

        this.auxAFDAdjudicados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="AFD" && proceso.intres_DETALLE==="ADJUDICADO"){
            this.adjudicadosAFD.push(this.auxAFDAdjudicados);
          }
        })

        this.auxBIDAdjudicados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="BID" && proceso.intres_DETALLE==="ADJUDICADO"){
            this.adjudicadosBID.push(this.auxBIDAdjudicados)
          }
        })
        this.auxREAdjudicados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="RE" && proceso.intres_DETALLE==="ADJUDICADO"){
            this.adjudicadosRE.push(this.auxREAdjudicados)
          }
        })

        this.auxMCOAdjudicados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="MCO" && proceso.intres_DETALLE==="ADJUDICADO"){
            this.adjudicadosMCO.push(this.auxMCOAdjudicados)
          }
        })

        this.auxMCSAdjudicados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="MCS" && proceso.intres_DETALLE==="ADJUDICADO"){
            this.adjudicadosMCS.push(this.auxMCSAdjudicados)
          } 
        })

        this.auxCOTSadjudicados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="COTS" && proceso.intres_DETALLE==="ADJUDICADO"){
            this.adjudicadosCOTS.push(this.auxCOTSadjudicados)
          }
        })

        this.auxLICOadjudicados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="LICO" && proceso.intres_DETALLE==="ADJUDICADO"){
                this.adjudicadosLICO.push(this.auxLICOadjudicados)
          }
        })

        this.auxFIadjudicados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="FI" && proceso.intres_DETALLE==="ADJUDICADO"){
            this.adjudicadosFI.push(this.auxFIadjudicados)
          }
        })

        this.auxSIEDesiertos=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="SIE" && proceso.intres_DETALLE==="DESIERTO"){
            this.desiertosSIE.push(this.auxSIEDesiertos);
          }
        })

        this.auxCOTODesiertos=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="COTO" && proceso.intres_DETALLE==="DESIERTO"){
            this.desiertosCOTO.push(this.auxCOTODesiertos);
          }
        })

        this.auxCDCDesiertos=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="CDC" && proceso.intres_DETALLE==="DESIERTO"){
            this.desiertosCDC.push(this.auxCDCDesiertos);
          }
        })

        this.auxAFDDesiertos=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="AFD" && proceso.intres_DETALLE==="DESIERTO"){
            this.desiertosAFD.push(this.auxAFDDesiertos);
          }
        })

        this.auxBIDDesiertos=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="BID" && proceso.intres_DETALLE==="DESIERTO"){
            this.desiertosBID.push(this.auxBIDDesiertos);
          }
        })

        this.auxREDesiertos=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="RE" && proceso.intres_DETALLE==="DESIERTO"){
            this.desiertosRE.push(this.auxREDesiertos);
          }
        })

        this.auxMCODesiertos=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="MCO" && proceso.intres_DETALLE==="DESIERTO"){
            this.desiertosMCO.push(this.auxMCODesiertos);
          }
        })

        this.auxMCSDesiertos=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="MCS" && proceso.intres_DETALLE==="DESIERTO"){
            this.desiertosMCS.push(this.auxMCSDesiertos);
          }
        })

        this.auxCOTSDesiertos=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="COTS" && proceso.intres_DETALLE==="DESIERTO"){
            this.desiertosCOTS.push(this.auxCOTSDesiertos);
          }
        })

        this.auxLICODesiertos=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="LICO" && proceso.intres_DETALLE==="DESIERTO"){
            this.desiertosLICO.push(this.auxLICODesiertos);
          }
        })

        this.auxFIDesiertos=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="FI" && proceso.intres_DETALLE==="DESIERTO"){
            this.desiertosFI.push(this.auxFIDesiertos);
          }
        })

        this.auxSIECancelados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="SIE" && proceso.intres_DETALLE==="CANCELADO"){
            this.canceladosSIE.push(this.auxSIECancelados);
          }
        })

        this.auxCOTOCancelados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="COTO" && proceso.intres_DETALLE==="CANCELADO" ){
            this.canceladosCOTO.push(this.auxCOTOCancelados);
          }
        })

        this.auxCDCCancelados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="CDC" && proceso.intres_DETALLE==="CANCELADO" ){
            this.canceladosCDC.push(this.auxCDCCancelados);
          }
        })

        this.auxAFDCancelados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="AFD" && proceso.intres_DETALLE==="CANCELADO" ){
            this.canceladosAFD.push(this.auxAFDCancelados);
          }
        })

        this.auxBIDCancelados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="BID" && proceso.intres_DETALLE==="CANCELADO" ){
            this.canceladosBID.push(this.auxBIDCancelados);
          }
        })

        this.auxRECancelados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="RE" && proceso.intres_DETALLE==="CANCELADO" ){
            this.canceladosRE.push(this.auxRECancelados);
          }
        })

        this.auxMCOCancelados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="MCO" && proceso.intres_DETALLE==="CANCELADO" ){
            this.canceladosMCO.push(this.auxMCOCancelados);
          }
        })


        this.auxMCSCancelados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="MCS" && proceso.intres_DETALLE==="CANCELADO" ){
            this.canceladosMCS.push(this.auxMCSCancelados);
          }
        })

        this.auxCOTSCancelados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="COTS" && proceso.intres_DETALLE==="CANCELADO" ){
            this.canceladosCOTS.push(this.auxCOTSCancelados);
          }
        })

        this.auxLICOCancelados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="LICO" && proceso.intres_DETALLE==="CANCELADO" ){
            this.canceladosLICO.push(this.auxLICOCancelados);
          }
        })

        this.auxFICancelados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="FI" && proceso.intres_DETALLE==="CANCELADO" ){
            this.canceladosFI.push(this.auxFICancelados);
          }
        })

        this.auxSIENoutilizados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="SIE" && proceso.intres_DETALLE==="NO UTILIZADO"){
            this.noUtilizadosSIE.push(this.auxSIENoutilizados);
          }
        })

        this.auxCOTONoUtilizados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="COTO" && proceso.intres_DETALLE==="NO UTILIZADO"){
            this.noUtilizadosCOTO.push(this.auxCOTONoUtilizados);
          }
        })

        this.auxCDCNoUtilizados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="CDC" && proceso.intres_DETALLE==="NO UTILIZADO"){
            this.noUtilizadosCDC.push(this.auxCDCNoUtilizados);
          }
        })

        this.auxAFDNoUtilizados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="AFD" && proceso.intres_DETALLE==="NO UTILIZADO"){
            this.noUtilizadosAFD.push(this.auxAFDNoUtilizados);
          }
        })

        this.auxBIDNoUtilizados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="BID" && proceso.intres_DETALLE==="NO UTILIZADO"){
            this.noUtilizadosBID.push(this.auxBIDNoUtilizados);
          }
        })

        this.auxRENoUtilizados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="RE" && proceso.intres_DETALLE==="NO UTILIZADO"){
            this.noUtilizadosRE.push(this.auxRENoUtilizados);
          }
        })

        this.auxMCONoUtilizados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="MCO" && proceso.intres_DETALLE==="NO UTILIZADO"){
            this.noUtilizadosMCO.push(this.auxMCONoUtilizados);
          }
        })

        this.auxMCSNoUtilizados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="MCS" && proceso.intres_DETALLE==="NO UTILIZADO"){
            this.noUtilizadosMCS.push(this.auxMCSNoUtilizados);
          }
        })

        this.auxCOTSNoUtilizados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="COTS" && proceso.intres_DETALLE==="NO UTILIZADO"){
            this.noUtilizadosCOTS.push(this.auxCOTSNoUtilizados);
          }
        })

        this.auxLICONoUtilizados=this.procesos.filter(proceso=>{
          if(proceso.intpro_ABREV==="LICO" && proceso.intres_DETALLE==="NO UTILIZADO"){
            this.noUtilizadosLICO.push(this.auxLICONoUtilizados);
          }
        })

        
          this.dataSource.data=this.procesos;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          for (const cate of this.procesos) {
            if(cate.intres_DETALLE==="ADJUDICADO"){
              this.numerointres_DETALLE.push(cate.intres_DETALLE)
            } 
            if(cate.intres_DETALLE==="DESIERTO"){
              this.numerointres_DETALLE_DESIERTO.push(cate.intres_DETALLE);

            }   
            if(cate.intres_DETALLE==="CANCELADO"){
              this.numerointres_DETALLE_CANCELADO.push(cate.intres_DETALLE);
            }
            if(cate.intres_DETALLE==="NO UTILIZADO"){
              this.numereointres_DETALLE_NO_UTILIZADO.push(cate.intres_DETALLE);

            }  
            if(cate.intpro_ABREV==="SIE"){
              this.numeroDeSIE.push(cate.intpro_ABREV);
              this.valorontratadoSIE.push(cate.contraf_VALOR_CONTRATO);
             
            }
            if(cate.intpro_ABREV==="COTO"){
              this.numeroDeCOTO.push(cate.intpro_ABREV);
              this.valorcontratadoCOTO.push(cate.contraf_VALOR_CONTRATO);
            }
            if(cate.intpro_ABREV==="CDC"){
              this.numeroDeCDC.push(cate.intpro_ABREV);
              this.valorcontratadoCDC.push(cate.contraf_VALOR_CONTRATO);
            }
            if(cate.intpro_ABREV==="AFD"){
              this.numeroDeAFD.push(cate.intpro_ABREV);
              this.valorcontratadoAFD.push(cate.contraf_VALOR_CONTRATO);
            }
            if(cate.intpro_ABREV==="BID"){
              this.numeroDeBID.push(cate.intpro_ABREV);
              this.valorcontratadoBID.push(cate.contraf_VALOR_CONTRATO);
            }
            if(cate.intpro_ABREV==="RE"){
              this.numeroDeRE.push(cate.intpro_ABREV);
              this.valorcontratadoRE.push(cate.contraf_VALOR_CONTRATO);
            }
            if(cate.intpro_ABREV==="MCO"){
              this.numeroDeMCO.push(cate.intpro_ABREV);
              this.valorcontratadoMCO.push(cate.contraf_VALOR_CONTRATO);
            }
            if(cate.intpro_ABREV==="MCS"){
              this.numeroDeMCS.push(cate.intpro_ABREV);
              this.valorcontratadoMCS.push(cate.contraf_VALOR_CONTRATO);
            }
            if(cate.intpro_ABREV==="COTS"){
              this.numeroDeCOTS.push(cate.intpro_ABREV);            
              this. valorcontratadoCOTS.push(cate.contraf_VALOR_CONTRATO);
            }  
            if(cate.intpro_ABREV==="LICO"){
              this.numeroDeLICO.push(cate.intpro_ABREV);
              this.valorcontratadoLICO.push(cate.contraf_VALOR_CONTRATO);
            }   
            if(cate.intpro_ABREV=="FI"){
              this.numeroDeFI.push(cate.intpro_ABREV);
              this.valorcontratadoFI.push(cate.contraf_VALOR_CONTRATO);
            }
            
          }
          this.dataSource.sortingDataAccessor=(item,property)=>{
            switch(property){
              case 'INTRP_FECHA_PUBLICACION': return new Date(item.createdAt); 
              default: return item[property];
            }
          }
          this.filterSelectObj.filter((o)=>{
            o.options=this.getFilterObject(response,o.columnProp);
          })
          this.dataSourceFilter=this.dataSource;
        })
      }
    })
  }
   /**
   * The filterChange function is called when the user changes the filter. 
   * 
   * The filterValues object is created and the filterValues[filter.columnProp] is set to the value of
   * the input field. 
   * 
   * The filterValues object is converted to a string and assigned to the dataSource's filter property.
   * 
   * 
   * The dataSource's filter property is assigned to the filterValues object
   * @param filter - The filter object that is being changed.
   * @param event - The event object that contains the value of the filter.
   */
    filterChange(filter, event) {
      //let filterValues = {}
      this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
      this.dataSource.filter = JSON.stringify(this.filterValues)
    }
    createFilter() {
      let filterFunction = function (data: any, filter: string): boolean {
        let searchTerms = JSON.parse(filter);
        let isFilterSet = false;
        for (const col in searchTerms) {
          if (searchTerms[col].toString() !== '') {
            isFilterSet = true;
          } else {
            delete searchTerms[col];
          }
        }
  
  
        let nameSearch = () => {
          let found = false;
          if (isFilterSet) {
            for (const col in searchTerms) {
              searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
                if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                  found = true
                }
              });
            }
            return found
          } else {
            return true;
          }
        }
        return nameSearch()
      }
      return filterFunction
      
    }


    resetFilters() {
      this.filterValues = {}
      this.filterSelectObj.forEach((value, key) => {
        value.modelValue = undefined;
      })
      this.dataSource.filter = "";
      this.calculacionTotal();
    }

    mostrar(){
      Swal.fire('EXCEL',`descargado con exito`,'success')
    }
    exportTable(){
      TableUtil.exportToPdf("ExampleTable");
    }

    
    calculacionTotal() {
      let sum: number = 0;
      if (this.dataSource)
        for (let row of this.dataSource.data) {
          if (row.id != 0) sum += row.contraf_VALOR_CONTRATO;
        }
      return sum.toFixed(2);
    }
    calcularTotal(){
      let sumSie=0;
      if(this.checkedSIE){      
        this.valorontratadoSIE;
        for(let i=0;i<this.valorontratadoSIE.length;i++){
          sumSie+=this.valorontratadoSIE[i];
        }
        return sumSie;
      }else if(this.checkedCOTO){
        let sumCOTO=0;
        for(let i=0;i<this.valorcontratadoCOTO.length;i++){
          sumCOTO+=this.valorcontratadoCOTO[i]
        }
        return sumCOTO;
      }else if(this.checkedCDC){
        let sumCDC=0;
        for(let i=0;i<this.valorcontratadoCDC.length;i++){
          sumCDC+=this.valorcontratadoCDC[i]
        }
        return sumCDC;
      }else if(this.checkedAFD){
        let sumAFD=0;
        for(let i=0;i<this.valorcontratadoAFD.length;i++){
          sumAFD+=this.valorcontratadoAFD[i]
        }
        return sumAFD;
      }else if(this.checkedBID){
        let sumBID=0;
        for(let i=0;i<this.valorcontratadoBID.length;i++){
          sumBID+=this.valorcontratadoBID[i]
        }
        return sumBID;
      }else if(this.checkedRE){
        let sumRE=0;
        for(let i=0;i<this.valorcontratadoRE.length;i++){
          sumRE+=this.valorcontratadoRE[i]
        }
        return sumRE;
      }else if(this.checkedMCO){
        let sumMCO=0;
        for(let i=0;i<this.valorcontratadoMCO.length;i++){
          sumMCO+=this.valorcontratadoRE[i]
        }
        return sumMCO;
      }else if(this.checkedMCS){
        let sumMCS=0;
        for(let i=0;i<this.valorcontratadoMCS.length;i++){
          sumMCS+=this.valorcontratadoMCS[i]
        }
        return sumMCS;
      }else if(this.checkedCOTS){
        let sumCOTS=0;
        for(let i=0;i<this.valorcontratadoCOTS.length;i++){
          sumCOTS+=this.valorcontratadoCOTS[i]
        }
        return sumCOTS;
      }else if(this.checkedLICO){
        let sumLICO=0;
        for(let i=0;i<this.valorcontratadoLICO.length;i++){
          sumLICO+=this.valorcontratadoLICO[i]
        }
        return sumLICO;
      }else if(this.checkedFI){
        let sumFI=0;
        for(let i=0;i<this.valorcontratadoFI.length;i++){
          sumFI+=this.valorcontratadoFI[i]
        }
        return sumFI;
      }
      else{
        return this.calculacionTotal();
    }
    }
    close() {
      this.show = false;
      setTimeout(() => this.show = true, 3000);
    }
    public vaciarListas(){
   
      this.numerointres_DETALLE=[];
      this.numerointres_DETALLE_CANCELADO=[];
      this.numerointres_DETALLE_DESIERTO=[];
      this.numereointres_DETALLE_NO_UTILIZADO=[];
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
  
      this.valorontratadoSIE=[];
      this.valorcontratadoCOTO=[];
      this.valorcontratadoCDC=[];
      this.valorcontratadoAFD=[];
      this.valorcontratadoBID=[];
      this.valorcontratadoRE=[];
      this.valorcontratadoMCO=[];
      this.valorcontratadoMCS=[];
      this.valorcontratadoCOTS=[];
      this.valorcontratadoLICO=[];
      this.valorcontratadoFI=[];

      this.adjudicadosSIE=[];
      this.auxSIEAdjudicados=[];
      this.cantidadAdjudicadosSIE=0;

      this.adjudicadosCOTO=[];
      this.auxCOTOAdjudicados=[];
      this.cantidadAdjudicadosCOTO=0;

      this.adjudicadosCDC=[];
      this.auxCDCAdjudicados=[];
      this.cantidadAdjudicadosCDC=0;

      this.adjudicadosAFD=[];
      this.auxAFDAdjudicados=[];
      this.cantidadAdjudicadosAFD=0;

      this.adjudicadosBID=[];
      this.auxBIDAdjudicados=[];
      this.cantidadAdjudicadosBID=0;

      this.adjudicadosRE=[];
      this.auxREAdjudicados=[];
      this.cantidadAdjudicadosRE=0;

      this.adjudicadosMCO=[];
      this.auxMCOAdjudicados=[];
      this.cantidadAdjudicadosMCO=0;

      this.adjudicadosMCS=[];
      this.auxMCSAdjudicados=[];
      this.cantidadAdjudicadosMCS=0;

      this.adjudicadosCOTS=[];
      this.auxCOTSadjudicados=[];
      this.cantidadAdjudicadosCOTS=0;

      this.adjudicadosLICO=[];
      this.auxLICOadjudicados=[];
      this.cantidadAdjudicadosLICO=0;

      this.adjudicadosFI=[];
      this.auxFIadjudicados=[];
      this.cantidadAdjudicadosFI=0;

      this.desiertosSIE=[];
      this.auxSIEDesiertos=[];
      this.cantidadDesiertosSIE=0;

      this.desiertosCOTO=[];
      this.auxCOTODesiertos=[];
      this.cantidadDesiertosCOTO=0;

      this.desiertosCDC=[];
      this.auxCDCDesiertos=[];
      this.cantidadDesiertosCDC=0;

      this.desiertosAFD=[];
      this.auxAFDDesiertos=[];
      this.cantidadDesiertosAFD=0;

      this.desiertosBID=[];
      this.auxBIDDesiertos=[];
      this.cantidadDesiertosBID=0;

      this.desiertosRE=[];
      this.auxREDesiertos=[];
      this.cantidadDesiertosRE=0;

      this.desiertosMCO=[];
      this.auxMCODesiertos=[];
      this.cantidadDesiertosMCO=0;

      this.desiertosMCS=[];
      this.auxMCSDesiertos=[];
      this.cantidadDesiertosMCS=0;

      this.desiertosCOTS=[];
      this.auxCOTSDesiertos=[];
      this.cantidadDesiertosCOTS=0;

      this.desiertosLICO=[];
      this.auxLICODesiertos=[];
      this.cantidadDesiertosLICO=0;

      this.desiertosFI=[];
      this.auxFIDesiertos=[];
      this.cantidadDesiertosFI=0;
      
      this.canceladosSIE=[];
      this.auxSIECancelados=[];
      this.cantidadCanceladosSIE=0;

      this.canceladosCOTO=[];
      this.auxCOTOCancelados=[];
      this.cantidadCanceladosCOTO=0;

      this.canceladosCDC=[];
      this.auxCDCCancelados=[];
      this.cantidadCanceladosCDC=0;

      this.canceladosAFD=[];
      this.auxAFDCancelados=[];
      this.cantidadCanceladosAFD=0;

      this.canceladosBID=[];
      this.auxBIDCancelados=[];
      this.cantidadCanceladosBID=0;

      this.canceladosRE=[];
      this.auxRECancelados=[];
      this.cantidadCanceladosRE=0;

      this.canceladosMCO=[];
      this.auxMCOCancelados=[];
      this.cantidadCanceladosMCO=0;

      this.canceladosMCS=[];
      this.auxMCSCancelados=[];
      this.cantidadCanceladosMCS=0
      
      this.canceladosCOTS=[];
      this.auxCOTSCancelados=[];
      this.cantidadCanceladosCOTS=0;

      this.canceladosLICO=[];
      this.auxLICOCancelados=[];
      this.cantidadCanceladosLICO=0;

      this.canceladosFI=[];
      this.auxFICancelados=[];
      this.cantidadCanceladosFI=0;

      this.noUtilizadosSIE=[];
      this.auxSIENoutilizados=[];
      this.cantidadNoutilizadosSIE=0;

      this.noUtilizadosCOTO=[];
      this.auxCOTONoUtilizados=[];
      this.cantidadNoutilizadosCOTO=0;

      this.noUtilizadosCDC=[];
      this.auxCDCNoUtilizados=[];
      this.cantidadNoutilizadosCDC=0;

      this.noUtilizadosAFD=[];
      this.auxAFDNoUtilizados=[];
      this.cantidadNoutilizadosAFD=0;

      this.noUtilizadosBID=[];
      this.auxBIDNoUtilizados=[];
      this.cantidadNoutilizadosBID=0;

      this.noUtilizadosRE=[];
      this.auxRENoUtilizados=[];
      this.cantidadNoutilizadosRE=0;

      this.noUtilizadosMCO=[];
      this.auxMCONoUtilizados=[];
      this.cantidadNoutilizadosMCO=0;

      this.noUtilizadosMCS=[];
      this.auxMCSNoUtilizados=[];
      this.cantidadNoutilizadosMCS=0;

      this.noUtilizadosCOTS=[];
      this.auxCOTSNoUtilizados=[];
      this.cantidadNoutilizadosCOTS=0;

      this.noUtilizadosLICO=[];
      this.auxLICONoUtilizados=[];
      this.cantidadNoutilizadosLICO=0;


      this.starDateEnviar=this.startDate;
      this.finalDateEnviar=this.finalDate;
   
    }
    openDialog() {
      this.dialog.open(ProcesosdialogComponent, {
        panelClass:['animate__animated','animate__slideInLeft'],
        width:'50%',
        
        data: {
          numerointres_Detalle: this.numerointres_DETALLE,
          numerointres_Detalle_Cancelado:this.numerointres_DETALLE_CANCELADO,
          numerointres_Detalle_Desierto:this.numerointres_DETALLE_DESIERTO,
          numereointres_DETALLE_NO_UTILIZADO:this.numereointres_DETALLE_NO_UTILIZADO,
          numeroSIE:this.numeroDeSIE,
          numeroDeCOTO:this.numeroDeCOTO,
          numeroDeCDC:this.numeroDeCDC,
          numeroDeAFD:this.numeroDeAFD,
          numeroDeBID:this.numeroDeBID,
          numeroDeRE:this.numeroDeRE,
          numeroDeMCO:this.numeroDeMCO,
          numeroDeMCS:this.numeroDeMCS,
          numeroDeCOTS:this.numeroDeCOTS,
          numeroDeLICO:this.numeroDeLICO,
          numeroDeFI:this.numeroDeFI,
          valorontratadoSIE:this.valorontratadoSIE,
          valorcontratadoCOTO:this.valorcontratadoCOTO,
          valorcontratadoCDC:this.valorcontratadoCDC,
          valorcontratadoAFD:this.valorcontratadoAFD,
          valorcontratadoBID:this.valorcontratadoBID,
          valorcontratadoRE:this.valorcontratadoRE,
          valorcontratadoMCO:this.valorcontratadoMCO,
          valorcontratadoMCS:this.valorcontratadoMCS,
          valorcontratadoCOTS:this.valorcontratadoCOTS,
          valorcontratadoLICO:this.valorcontratadoLICO,
          valorcontratadoFI:this.valorcontratadoFI,
          startDate:this.starDateEnviar,
          finalDate:this.finalDateEnviar
        },
        
        
      });
    }

   

    todosProcesos(){
     this.selectedTipo=undefined
     this.dataSource.data=this.procesos;
    }

    filtrar_departamentos(departamento:string,procesos:VISTAPROCESOS[]):VISTAPROCESOS[]{
      if(departamento==''){
        return procesos;
      }
      return procesos.filter(function(proceso){
        return proceso.intdep_DESCRIPCION==departamento;
      })
    }

    comboxFiltrarTipo() {
      if(this.selectedTipo==="SIE"){
        this.cantidadAdjudicadosSIE=this.adjudicadosSIE.length;
        this.cantidadDesiertosSIE=this.desiertosSIE.length;
        this.cantidadCanceladosSIE=this.canceladosSIE.length;
        this.cantidadNoutilizadosSIE=this.noUtilizadosSIE.length;
        this.dataSource.data=this.procesosSIE;
        this.procesosSIE=this.filtrar_departamentos(this.select_departamento,this.procesosSIEFilter);
        this.dataSource.data=this.procesosSIE;
      }else if(this.selectedTipo==="COTO"){
        this.cantidadAdjudicadosCOTO=this.adjudicadosCOTO.length;
        this.cantidadDesiertosCOTO=this.desiertosCOTO.length;
        this.cantidadCanceladosCOTO=this.canceladosCOTO.length;
        this.cantidadNoutilizadosCOTO=this.noUtilizadosCOTO.length;
        this.dataSource.data=this.procesosCOTO;
        this.procesosCOTO=this.filtrar_departamentos(this.select_departamento,this.procesosCOTOFilter);
        this.dataSource.data=this.procesosCOTO;
      }else if(this.selectedTipo==="CDC"){
        this.cantidadAdjudicadosCDC=this.adjudicadosCDC.length;
        this.cantidadDesiertosCDC=this.desiertosCDC.length;
        this.cantidadCanceladosCDC=this.canceladosCDC.length;
        this.cantidadNoutilizadosCDC=this.noUtilizadosCDC.length;
        this.dataSource.data=this.procesosCDC
        this.procesosCDC=this.filtrar_departamentos(this.select_departamento,this.procesosCDCFilter);
        this.dataSource.data=this.procesosCDC;
      }else if(this.selectedTipo==="AFD"){
        this.cantidadDesiertosAFD=this.desiertosAFD.length;
        this.cantidadAdjudicadosAFD=this.adjudicadosAFD.length;
        this.cantidadCanceladosAFD=this.canceladosAFD.length;
        this.cantidadNoutilizadosAFD=this.noUtilizadosAFD.length;
        this.dataSource.data=this.procesosAFD
        this.procesosAFD=this.filtrar_departamentos(this.select_departamento,this.procesosAFDFilter);
        this.dataSource.data=this.procesosAFD;
      }else if(this.selectedTipo==="BID"){
        this.cantidadDesiertosBID=this.desiertosBID.length;
        this.cantidadAdjudicadosBID=this.adjudicadosBID.length;
        this.cantidadCanceladosBID=this.canceladosBID.length;
        this.cantidadNoutilizadosBID=this.noUtilizadosBID.length;
        this.dataSource.data=this.procesosBID
        this.procesosBID=this.filtrar_departamentos(this.select_departamento,this.procesosBIDFilter);
        this.dataSource.data=this.procesosBID;
      }else if(this.selectedTipo==="RE"){
        this.cantidadDesiertosRE=this.desiertosRE.length;
        this.cantidadAdjudicadosRE=this.adjudicadosRE.length;
        this.cantidadCanceladosRE=this.canceladosRE.length;
        this.cantidadNoutilizadosRE=this.noUtilizadosRE.length;
        this.dataSource.data=this.procesosRE
        //this.procesosRE=this.filtrar_departamentos(this.select_departamento,this.procesosREFilter);
        //this.dataSource.data=this.procesosRE;
      }else if(this.selectedTipo==="MCO"){
        this.cantidadDesiertosMCO=this.desiertosMCO.length;
        this.cantidadAdjudicadosMCO=this.adjudicadosMCO.length;
        this.cantidadCanceladosMCO=this.canceladosMCO.length;
        this.cantidadNoutilizadosMCO=this.noUtilizadosMCO.length;
        this.dataSource.data=this.procesosMCO
        this.procesosMCO=this.filtrar_departamentos(this.select_departamento,this.procesosMCOFilter);
        this.dataSource.data=this.procesosMCO;
      }else if(this.selectedTipo==="MCS"){
        this.cantidadDesiertosMCS=this.desiertosMCS.length;
        this.cantidadAdjudicadosMCS=this.adjudicadosMCS.length;
        this.cantidadCanceladosMCS=this.canceladosMCS.length;
        this.cantidadNoutilizadosMCS=this.noUtilizadosMCS.length;
        this.dataSource.data=this.procesosMCS
        this.procesosMCS=this.filtrar_departamentos(this.select_departamento,this.procesosMCS);
        this.dataSource.data=this.procesosMCS;
      }else if(this.selectedTipo==="COTS"){
        this.cantidadDesiertosCOTS=this.desiertosCOTS.length;
        this.cantidadAdjudicadosCOTS=this.adjudicadosCOTS.length;
        this.cantidadCanceladosCOTS=this.canceladosCOTS.length;
        this.cantidadNoutilizadosCOTS=this.noUtilizadosCOTS.length;
        this.dataSource.data=this.procesosCOTS
        this.procesosCOTS=this.filtrar_departamentos(this.select_departamento,this.procesosCOTSFilter);
        this.dataSource.data=this.procesosCOTS;
      }else if(this.selectedTipo==="LICO"){
        this.cantidadDesiertosLICO=this.desiertosLICO.length;
        this.cantidadAdjudicadosLICO=this.adjudicadosLICO.length;
        this.cantidadCanceladosLICO=this.canceladosLICO.length;
        this.cantidadNoutilizadosLICO=this.noUtilizadosLICO.length;
        this.dataSource.data=this.procesosLICO
        this.procesosLICO=this.filtrar_departamentos(this.select_departamento,this.procesosLICOFilter);
        this.dataSource.data=this.procesosLICO;
      }else if(this.selectedTipo==="FI"){
        this.cantidadDesiertosFI=this.desiertosFI.length;
        this.cantidadAdjudicadosFI=this.adjudicadosFI.length;
        this.cantidadCanceladosFI=this.canceladosFI.length;
        this.dataSource.data=this.procesosFI
        this.procesosFI=this.filtrar_departamentos(this.select_departamento,this.procesosFIFilter);
        this.dataSource.data=this.procesosFI;
      }
      else{
        this.dataSource.data=this.procesos;
      }
    }

  filtrarTotalAdjudicados(){
    if(this.selectedTipo==="SIE"){
      return this.cantidadAdjudicadosSIE
    }else if(this.selectedTipo==="COTO"){
      return this.cantidadAdjudicadosCOTO
    }else if(this.selectedTipo==="CDC"){
      return this.cantidadAdjudicadosCDC
    }else if(this.selectedTipo==="AFD"){
      return this.cantidadAdjudicadosAFD
    }else if(this.selectedTipo==="BID"){
      return this.cantidadAdjudicadosBID
    }else if(this.selectedTipo==="RE"){
      return this.cantidadAdjudicadosRE
    }else if(this.selectedTipo==="MCO"){
      return this.cantidadAdjudicadosMCO
    }else if(this.selectedTipo==="MCS"){
      return this.cantidadAdjudicadosMCS
    }else if(this.selectedTipo==="COTS"){
      return this.cantidadAdjudicadosCOTS
    }else if(this.selectedTipo==="LICO"){
      return this.cantidadAdjudicadosLICO
    }else if(this.selectedTipo==="FI"){
      return this.cantidadAdjudicadosFI
    }
    else{
      return this.numerointres_DETALLE.length
    }
  }
  filtrarTotalDesiertos(){
    if(this.selectedTipo==="SIE"){
      return this.cantidadDesiertosSIE;
    }else if(this.selectedTipo==="COTO"){
      return this.cantidadDesiertosCOTO;
    }else if(this.selectedTipo==="CDC"){
      return this.cantidadDesiertosCDC;
    }else if(this.selectedTipo==="AFD"){
      return this.cantidadDesiertosAFD;
    }else if(this.selectedTipo==="BID"){
      return this.cantidadDesiertosBID;
    }else if(this.selectedTipo==="RE"){
      return this.cantidadDesiertosRE;
    }else if(this.selectedTipo==="MCO"){
      return this.cantidadDesiertosMCO;
    }else if(this.selectedTipo==="MCS"){
      return this.cantidadDesiertosMCS;
    }else if(this.selectedTipo==="COTS"){
      return this.cantidadDesiertosCOTS;
    }else if(this.selectedTipo==="LICO"){
      return this.cantidadDesiertosLICO;
    }else if(this.selectedTipo==="FI"){
      return this.cantidadDesiertosFI;
    }
    else {
      return this.numerointres_DETALLE_DESIERTO.length;
    }
  }
  filtrarTotalCancelados(){
    if(this.selectedTipo==="SIE"){
      return this.cantidadCanceladosSIE;
    }else if(this.selectedTipo==="COTO"){
      return this.cantidadCanceladosCOTO;
    }else if(this.selectedTipo==="CDC"){
      return this.cantidadCanceladosCDC;
    } else if(this.selectedTipo==="AFD"){
      return this.cantidadCanceladosAFD;
    } else if(this.selectedTipo==="BID"){
      return this.cantidadCanceladosBID;
    } 
    else if(this.selectedTipo==="RE"){
      return this.cantidadCanceladosRE;
    }  
    else if(this.selectedTipo==="MCO"){
      return this.cantidadCanceladosMCO;
    }  
    else if(this.selectedTipo==="MCS"){
      return this.cantidadCanceladosMCS;
    }   
    else if(this.selectedTipo==="COTS"){
      return this.cantidadCanceladosCOTS;
    } 
    else if(this.selectedTipo==="LICO"){
      return this.cantidadCanceladosLICO;
    }  
    else if(this.selectedTipo==="FI"){
      return this.cantidadCanceladosFI;
    }  
    else{
      return this.numerointres_DETALLE_CANCELADO.length;
    }
  }
  filtrarTotalNoUtilizados(){
    if(this.selectedTipo==="SIE"){
      return this.cantidadNoutilizadosSIE;
    }else if(this.selectedTipo==="COTO"){
      return this.cantidadNoutilizadosCOTO;
    }
    else if(this.selectedTipo==="CDC"){
      return this.cantidadNoutilizadosCDC;
    }
    else if(this.selectedTipo==="AFD"){
      return this.cantidadNoutilizadosAFD;
    }
    else if(this.selectedTipo==="BID"){
      return this.cantidadNoutilizadosBID;
    }
    else if(this.selectedTipo==="RE"){
      return this.cantidadNoutilizadosRE;
    }
    else if(this.selectedTipo==="MCO"){
      return this.cantidadNoutilizadosMCO;
    }
    else if(this.selectedTipo==="MCS"){
      return this.cantidadNoutilizadosMCS;
    }
    else if(this.selectedTipo==="COTS"){
      return this.cantidadNoutilizadosCOTS;
    }
    else if(this.selectedTipo==="LICO"){
      return this.cantidadNoutilizadosLICO;
    }
    else{
      return this.numereointres_DETALLE_NO_UTILIZADO.length;
    }
  }


}
