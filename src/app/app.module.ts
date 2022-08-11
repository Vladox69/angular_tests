import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ReportesComponent } from './reportes/reportes.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTableExporterModule } from 'mat-table-exporter';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';


import {HttpClientModule} from '@angular/common/http';
import { ReportesservicioComponent } from './reportesservicio/reportesservicio.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ReportesporfechaComponent } from './reportesporfecha/reportesporfecha.component';
import { ReportesfiltradosComponent } from './reportesfiltrados/reportesfiltrados.component';
import { GraficosComponent } from './graficos/graficos.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProcesosdialogComponent } from './procesosdialog/procesosdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    SidenavComponent,
    ReportesComponent,
    ReportesservicioComponent,
    ReportesporfechaComponent,
    ReportesfiltradosComponent,
    GraficosComponent,
    ProcesosdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableExporterModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    NgApexchartsModule,
    MatDialogModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
