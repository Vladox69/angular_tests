import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Character } from './models/personajes';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private urlEndPoint:string='https://rickandmortyapi.com/api/character';
  private httpHeaders= new HttpHeaders({
    'Content-type': 'application/json'
  });

  constructor(private http:HttpClient,private router:Router) { }

getCharacters():Observable<Character[]>{
  return this.http.get<Character[]>(this.urlEndPoint).pipe(
    tap((response:any)=>{
      (response.content as Character[]).forEach(personaje=>{
        console.log(personaje.name)
      })
    })
  )
}

}
