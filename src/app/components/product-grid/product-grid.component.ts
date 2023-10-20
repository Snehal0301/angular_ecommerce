import { ApiService } from 'src/service/testapi.service';
import { Component, Input } from '@angular/core';
import { WishlistService } from 'src/service/wishlist.service';
import { updateProduct } from 'src/utils/apiService';
import { CartService } from 'src/service/cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
  providers: [MessageService],
})
export class ProductGridComponent {
  like: boolean = false;
  toastRender: boolean = false;
  @Input() data: any;
  @Input() gridlayout: any;
  @Input() location: any;

  constructor(
    private apiService: ApiService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private messageService: MessageService
  ) {
    this.data;
    this.gridlayout = 'grid';
  }

  handleFunction(type: string, item: any) {
    if (type === 'wishlist') {
      if (item.isWishlisted) {
        this.removeList(item, type);
      } else {
        this.addToList(item, type);
      }
    } else if (type === 'cart') {
      if (item.isAddtoCart) {
        this.removeList(item, type);
      } else {
        this.addToList(item, type);
      }
    }
  }

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
