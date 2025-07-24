import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecetteApiService {
  private readonly API_URL = 'https://exemple-api.com/recettes'; // À remplacer par l'URL réelle

  constructor(private http: HttpClient) {}

  getRecettes(userId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${userId}`);
  }

  saveRecettes(userId: string, recettes: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${userId}`, recettes);
  }
}
