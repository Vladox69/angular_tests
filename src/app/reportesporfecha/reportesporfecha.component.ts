import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportesporfecha',
  templateUrl: './reportesporfecha.component.html',
  styleUrls: ['./reportesporfecha.component.css']
})
export class ReportesporfechaComponent implements OnInit {
  filterForm = new FormGroup({
    fromDate: new FormControl('',Validators.required),
    toDate: new FormControl('',Validators.required),
  });

  startDate:any;
  finalDate:any;
  fechafinal:any=this.filterForm.value.fromDate;
  buttonDisabled: boolean;

  



  constructor() { }

  ngOnInit(): void {
    this.buttonDisabled=false;
    //this.activateButton();
    
  }

  error(){
    if(this.startDate==null || this.finalDate==null){
      Swal.fire('Error',`elija una fecha inicial y una final`,'error')

    }
  }

  activateButton(){
    if(this.startDate==null || this.finalDate==null){
      this.buttonDisabled=true;
    }else{
      this.buttonDisabled=false;
    }
  }

}
