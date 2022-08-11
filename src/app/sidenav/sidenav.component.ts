import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

 // Uso de Componentes
    fillerNav=[{
      name:'Home',
      route:'',
      icon:'home'
    },
      {
        name:'Reportes por Fecha',
        route:'reportesporfecha/reportesfiltrados',
        icon:'date_range'
      },
      {
        name:'Graficas',
        route:'graficos',
        icon:'assessment'
      }
  ]
  

  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
   }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  
  shouldRun = true;
}
