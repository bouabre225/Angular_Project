import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlanningApiService {
  private readonly API_URL = 'https://exemple-api.com/planning'; // À remplacer par l'URL réelle

  constructor(private http: HttpClient) {}

  getPlanning(userId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${userId}`);
  }

  savePlanning(userId: string, planning: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${userId}`, planning);
  }
}
