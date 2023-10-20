import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from './testapi.service';
import { WishlistService } from './wishlist.service';
import { CartService } from './cart.service';
import { updateProduct } from 'src/utils/apiService';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  addToList(item: any, type: string): void {
    if (type === 'wishlist') {
      item.isWishlisted = true;
      this.renderToastState(item, type, 'add');
    } else if (type === 'cart') {
      item.isAddtoCart = true;
      this.renderToastState(item, type, 'add');
    }
    this.updateProductFunc(item.category, item.id, item);
  }

  updateProductFunc(category: string, id: string, updatedData: any) {
    updateProduct(category, this.apiService, id, updatedData).subscribe(
      (response) => {
        console.log('product updated successfully', response);
      },
      (error) => {
        console.error('Error in updation:', error);
      }
    );
  }

  removeList(item: any, type: string): void {
    if (type === 'wishlist') {
      item.isWishlisted = false;
      this.renderToastState(item, type, 'remove');
    } else if (type === 'cart') {
      item.isAddtoCart = false;
      this.renderToastState(item, type, 'remove');
    }
    this.updateProductFunc(item.category, item.id, item);
  }

  renderToastState(item: any, type: string, state: string) {
    if (type === 'wishlist') {
      if (state === 'add') {
        this.addToWishlist(item);
      } else if (state === 'remove') {
        this.deleteWishlist(item.id);
      }
    } else if (type === 'cart') {
      if (state === 'add') {
        this.addToCart(item);
      } else if (state === 'remove') {
        this.deleteCart(item.id);
      }
    }
  }

  addToWishlist(item: any) {
    this.wishlistService.addToWishlist(item).then((result) => {
      if (result) {
        this.messageService.clear();
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Added',
          detail: 'Product added to Wishlist',
        });
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          detail: 'Couldnt add to Wishlist',
        });
      }
    });
  }

  deleteWishlist(id: string) {
    this.wishlistService.deleteFromWishlist(id).then((result) => {
      if (result) {
        this.messageService.clear();
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Removed',
          detail: 'Product removed from Wishlist',
        });
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          detail: 'Couldnt remove from Wishlist',
        });
      }
    });
  }

  addToCart(item: any) {
    this.cartService.addToCart(item).then((result) => {
      if (result) {
        this.messageService.clear();
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Added',
          detail: 'Product added to Cart',
        });
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          detail: 'Couldnt add to Wishlist',
        });
      }
    });
  }

  deleteCart(id: string) {
    this.cartService.deleteFromCart(id).then((result) => {
      if (result) {
        this.messageService.clear();
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Removed',
          detail: 'Product removed from Cart',
        });
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          detail: 'Couldnt remove from Cart',
        });
      }
    });
  }
}
