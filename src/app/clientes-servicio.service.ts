import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesServicioService {
  private urlEndPoint:string='https://facturaheroku.herokuapp.com/api/clientes';
  private httpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  });

  constructor(private http:HttpClient) { }

  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

}
