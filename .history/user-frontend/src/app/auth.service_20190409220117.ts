import { Injectable } from '@angular/core';
import {HttpClient}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
}
