import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ship } from './ship';
import { environment } from 'src/environments/environment';



@Injectable({providedIn: 'root'})
export class shipService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getShips(): Observable<ship[]> {
    return this.http.get<ship[]>(`${this.apiServerUrl}/ship/all`);
  }

  public addShip(ship: ship): Observable<ship> {
    return this.http.post<ship>(`${this.apiServerUrl}/ship/add`, ship);
  }

  public updateShip(ship: ship): Observable<ship> {
    return this.http.put<ship>(`${this.apiServerUrl}/ship/update`, ship);
  }

  public deleteShip(shipId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/ship/delete/${shipId}`);
  }
}
