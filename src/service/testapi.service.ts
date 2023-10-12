import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyApiService {
  private apiUrl = 'http://localhost:3000/posts'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
