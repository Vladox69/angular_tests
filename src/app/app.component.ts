import { Component } from '@angular/core';
import { ExcelService } from './services/excel.service';
import { HerosService } from './services/heros.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'export';

  constructor(private _herosService:HerosService,private _excelService:ExcelService){}

  download():void{
    this._herosService.getHeros().subscribe((response)=>{
      this._excelService.dowloadExcel(response);
    })
  }

}
