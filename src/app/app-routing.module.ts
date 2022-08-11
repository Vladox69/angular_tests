import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficosComponent } from './graficos/graficos.component';
import { HomeComponent } from './home/home.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ReportesfiltradosComponent } from './reportesfiltrados/reportesfiltrados.component';
import { ReportesporfechaComponent } from './reportesporfecha/reportesporfecha.component';
import { ReportesservicioComponent } from './reportesservicio/reportesservicio.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'reportes',component:ReportesComponent},
  {path:'reporteprocesos',component:ReportesservicioComponent},
  {path:'reportesporfecha',component:ReportesporfechaComponent},
  {path:'reportesporfecha/reportesfiltrados',component:ReportesfiltradosComponent},
  {path:'reportesporfecha/reportesfiltrados/:startdate/:endDate',component:ReportesfiltradosComponent},
  {path:'graficos',component:GraficosComponent},
  {path:'graficos/filtrados/:startdate/:endDate',component:GraficosComponent},
  {path:'**',component:HomeComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
