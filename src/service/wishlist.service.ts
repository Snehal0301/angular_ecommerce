import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './testapi.service';

@Injectable()
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$: Observable<any[]> = this.wishlistSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.fetchWishlistData();
  }

  fetchWishlistData() {
    this.apiService.getWishlist().subscribe(
      (response) => {
        this.wishlistSubject.next(response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  addToWishlist(item: any) {
    this.apiService.postWishlist(item).subscribe(
      (response) => {
        const updatedWishlist = this.wishlistSubject.value.concat(item);
        this.wishlistSubject.next(updatedWishlist);
        console.log('Added wishlist', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  
  deleteFromWishlist(id: any) {
    this.apiService.deleteWishlist(id).subscribe(
      (response) => {
        const updatedWishlist = this.wishlistSubject.value.filter((item) => item.id !== id);
        this.wishlistSubject.next(updatedWishlist);
        console.log('Deleted wishlist item', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  
}
