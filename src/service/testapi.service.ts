import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private featureUrl = 'http://localhost:3000/featured';
  private latestUrl = 'http://localhost:3000/latest';
  private watchUrl = 'http://localhost:3000/watches';
  private mensUrl = 'http://localhost:3000/mens';
  private womensUrl = 'http://localhost:3000/womens';
  private wishlistUrl = 'http://localhost:3000/wishlist';
  private cartUrl = 'http://localhost:3000/cart';

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

  // MENS PRODUCT START
  getSingleMensProduct(id: string): Observable<any> {
    const url = this.mensUrl + '/' + id;
    return this.http.get(url);
  }
  
  getMensProduct(sort?: string, order?: string): Observable<any> {
    let url = '';
    if (sort || order) {
      url = this.mensUrl + '?_sort=' + sort + '&_order=' + order;
    } else {
      url = this.mensUrl;
    }
    return this.http.get(url);
  }
  
  updateMensProduct(id: string, updateData: any): Observable<any> {
    let url = this.mensUrl + '/' + id;
    return this.http.patch(url, updateData);
  }
  // MENS PRODUCT END

  // WOMENS PRODUCT START
  getWomensProduct(sort?: string, order?: string): Observable<any> {
    let url = '';
    if (sort || order) {
      url = this.womensUrl + '?_sort=' + sort + '&_order=' + order;
    } else {
      url = this.womensUrl;
    }
    return this.http.get(url);
  }
  
  getSingleWomensProduct(id: string): Observable<any> {
    const url = this.womensUrl + '/' + id;
    return this.http.get(url);
  }

  updateWomensProduct(id: string, updateData: any): Observable<any> {
    let url = this.womensUrl + '/' + id;
    return this.http.patch(url, updateData);
  }
  // WOMENS PRODUCT END
  
  // WISHLIST START
  postWishlist(item: any): Observable<any> {
    return this.http.post(this.wishlistUrl, item);
  }
  
  getWishlist(): Observable<any> {
    return this.http.get(this.wishlistUrl);
  }
  
  deleteWishlist(id: any): Observable<any> {
    let url = this.wishlistUrl + `/${id}`;
    return this.http.delete(url, { observe: 'response' });
  }
  // WISHLIST END

  // CART START
  postCart(item: any): Observable<any> {
    return this.http.post(this.cartUrl, item);
  }
  
  getCart(): Observable<any> {
    return this.http.get(this.cartUrl);
  }
  
  deleteCart(id: any): Observable<any> {
    let url = this.cartUrl + `/${id}`;
    return this.http.delete(url, { observe: 'response' });
  }
  // CART END
}
