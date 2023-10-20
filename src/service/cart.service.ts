import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './testapi.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$: Observable<any[]> = this.cartSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.fetchCartData();
  }

  fetchCartData() {
    this.apiService.getCart().subscribe(
      (response) => {
        this.cartSubject.next(response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  addToCart(item: any):Promise<boolean> {
    return new Promise<boolean>((resolve, reject) =>{
      this.apiService.postCart(item).subscribe(
        (response) => {
          const updatedWishlist = this.cartSubject.value.concat(item);
          this.cartSubject.next(updatedWishlist);
          console.log('Added cart', response);
          resolve(true)
        },
        (error) => {
          console.error('Error:', error);
          resolve(false)
        }
      );
    })
  }
  
  deleteFromCart(id: any):Promise<boolean> {
    return new Promise((resolve, reject)=>{
      this.apiService.deleteCart(id).subscribe(
        (response) => {
          const updatedWishlist = this.cartSubject.value.filter((item) => item.id !== id);
          this.cartSubject.next(updatedWishlist);
          resolve(true)
        },
        (error) => {
          console.error('Error:', error);
          resolve(false)
        }
      );
    })
  }
}
