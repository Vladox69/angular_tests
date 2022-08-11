import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VISTAPROCESOS } from './models/vistaprocesos';
import { VISTAREPORTE } from './models/vistareporte';

@Injectable({
  providedIn: 'root'
})
export class ProcesosservicioService {

  private urlEndPoint:string='http://localhost:8080/api/reportes';
  private urlEndPointDate:string='http://localhost:8080/api/reportes/creado';
  private httpHeaders= new HttpHeaders({
    "Access-Control-Allow-Origin":"*",
    'Content-type': 'application/json'
  });


  constructor(private http:HttpClient) { }

  getProcesos():Observable<VISTAPROCESOS[]>{
    return this.http.get<VISTAPROCESOS[]>(this.urlEndPoint);
  }
  getProcesosbyDate(startdate,endDate):Observable<VISTAPROCESOS[]>{
    return this.http.get<VISTAPROCESOS[]>(`${this.urlEndPointDate}/${startdate}/${endDate}`)
  }

}
