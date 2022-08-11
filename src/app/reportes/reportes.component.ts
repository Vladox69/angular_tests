import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { tap } from 'rxjs';
import { ClientesServicioService } from '../clientes-servicio.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import * as XLSX from "xlsx";
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { Cliente } from '../models/clientes';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

columnsToDisplay = ['id', 'nombre', 'apellido', 'createAt','email'];
dataSource:any= new MatTableDataSource();
filterValues = {};
filterSelectObj = [];
clientes:Cliente[];
pipe: DatePipe;
filterForm = new FormGroup({
  fromDate: new FormControl(),
  toDate: new FormControl(),
});
get fromDate() {
  return this.filterForm.get('fromDate').value;
}
get toDate() {
  return this.filterForm.get('toDate').value;
}


@ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private servicio:ClientesServicioService) { 
    this.filterSelectObj = [
      {
        name: 'ID',
        columnProp: 'id',
        options: []
      }, {
        name: 'NOMBRE',
        columnProp: 'nombre',
        options: []
      }
    ]
    this.pipe = new DatePipe('es');
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        return data.created >= this.fromDate && data.created <= this.toDate;
      }
      return true;
    };


  }

  ngOnInit(): void {   
    this.getRemoteData();

    // Overrride default filter behaviour of Material Datatable
    this.dataSource.filterPredicate = this.createFilter();
    
  }
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

  getRemoteData() {
    this.servicio.getClientes().subscribe((response:any)=>{
      this.clientes=response;
      this.dataSource.data=response
      this.dataSource.paginator = this.paginator;
      this.filterSelectObj.filter((o)=>{
        o.options=this.getFilterObject(response,o.columnProp);
      })
      this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        return data.created >= this.fromDate && data.created <= this.toDate;
      }
      return true;
    };
    })
  }
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
  exportTable() {
    
  }

  mostrar(){
    Swal.fire('EXCEL',`descargado con exito`,'success')
  }
  
  applyFilter() {
    this.dataSource.filter = '' + Math.random();
  }
  

}
