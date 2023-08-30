import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
    isAuthenticated() {
        throw new Error('Method not implemented.');
    }
  
    public username: string | undefined;
    public password: string | undefined;

  constructor(private http: HttpClient) {

  }

  

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(_username: string, password: string) {
    // save the username to session
  }
}