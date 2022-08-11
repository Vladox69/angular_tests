import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VISTAREPORTE } from '../models/vistareporte';
import { ProcesosservicioService } from '../procesosservicio.service';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas';

import { TableUtil } from './tableUtil';

@Component({
  selector: 'app-reportesservicio',
  templateUrl: './reportesservicio.component.html',
  styleUrls: ['./reportesservicio.component.css']
})
export class ReportesservicioComponent implements OnInit {

  columnsToDisplay = ['INTRP_FECHA_PUBLICACION','INTPRO_DESCRIPCION','INTPRO_ABREV','INTRP_NUMEROPROCESO',
  'INTRP_CODIGOPROCESO','INTRP_DETALLE','INTRES_DETALLE','INTRP_NUMOFICIO','MA_CONT_RAZON_SOCIAL',
    'CONTRAF_NUMERO_CONTRATO','CONTRAF_VALOR_CONTRATO'];
    dataSource:any= new MatTableDataSource();
    filterValues = {};
    filterSelectObj = [];
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
 

  


  constructor(private procesosServicio:ProcesosservicioService) { 
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

  /**
   * This function is used to get the data from the server and display it in the table
   */
  getRemoteData() {
    this.procesosServicio.getProcesos().subscribe((response:any)=>{
    this.dataSource.data=response
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor=(item,property)=>{
      switch(property){
        case 'INTRP_FECHA_PUBLICACION': return new Date(item.createdAt); 
        default: return item[property];
      }
    }
    this.filterSelectObj.filter((o)=>{
      o.options=this.getFilterObject(response,o.columnProp);
    })


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
  }

  mostrar(){
    Swal.fire('EXCEL',`descargado con exito`,'success')
  }

  exportTable(){
    TableUtil.exportToPdf("ExampleTable");
  }
  captureScreen() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data as any).then(canvas => {
        var imgWidth = 210;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        const contentDataURL = canvas.toDataURL('image/png');
        let pdfData = new jsPDF('p', 'mm', 'a4');
        var position = 0;
        pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdfData.save(`MyPdf.pdf`);
    });
}

  }

  




  
   


