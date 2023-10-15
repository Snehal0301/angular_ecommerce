import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyApiService {
  private featureUrl = 'http://localhost:3000/featured'; // Replace with your API endpoint
  private latestUrl = 'http://localhost:3000/latest'; // Replace with your API endpoint
  private watchUrl = 'http://localhost:3000/watches'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getFeaturedData(): Observable<any> {
    const url = this.featureUrl;
    return this.http.get(url);
  }
  getLatestData(): Observable<any> {
    const url = this.latestUrl;
    return this.http.get(url);
  }
  getWatchData(): Observable<any> {
    const url = this.watchUrl;
    return this.http.get(url);
  }
}
