import { ApiService } from 'src/service/testapi.service';
import { Component, Input } from '@angular/core';
import { WishlistService } from 'src/service/wishlist.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent {
  like: boolean = false;
  @Input() data: any;
  @Input() gridlayout: any;
  @Input() location: any;
  parentClass: string = 'products-grid';
  wishlistState: { [key: string]: boolean } = {};
  wishlistItems: any[] = [];

  constructor(
    private apiService: ApiService,
    private wishlistService: WishlistService
  ) {
    this.data;
    this.gridlayout = 'grid';
  }

  handleFunction(type: string, item: any) {
    if (type === 'wishlist') {
      if (this.isItemInWishlist(item)) {
        this.removeFromWishlist(item);
        this.wishlistState[item.id] = false;
      } else {
        this.addToWishlist(item);
        this.wishlistState[item.id] = true;
      }
    }
  }

  handleClick() {
    console.log(this.wishlistState);
  }

  // isItemInWishlist(item: any): boolean {
  //   return this.wishlistItems.some(subArray => subArray[0] === item.id);
  // }
  isItemInWishlist(item: any): boolean {
    return this.wishlistItems.includes(item.id);
  }

  addToWishlist(item: any): void {
    // const wishlistItem = {
    //   id: item.id,
    //   state: state
    // };
    // this.wishlistItems.push(item.id, state);
    this.wishlistItems.push(item.id);
    this.wishlistService.addToWishlist(item);
  }

  removeFromWishlist(item: any): void {
    const index = this.wishlistItems.indexOf(item.id);
    if (index !== -1) {
      // Remove the item ID from the wishlistItems array
      this.wishlistItems.splice(index, 1);
      this.wishlistService.deleteFromWishlist(item.id);
    }
  }

  // removeFromWishlist(item: any): void {
  //   const index = this.wishlistItems.findIndex(
  //     (subArray) => subArray[0] === item.id
  //   );
  //   console.log('index',index);
  //   if (index !== -1) {
  //     // Remove the sub-array containing the item ID and boolean value
  //     this.wishlistItems.splice(index, 1);
  //     this.wishlistService.deleteFromWishlist(item.id);
  //   }
  // }
}
