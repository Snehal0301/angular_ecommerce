import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/service/testapi.service';
import {
  getAllProductsApi,
  sortPriceApi,
  sortRatingApi,
} from 'src/utils/apiService';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
})
export class ProductlistComponent {
  category: any;
  _sort: any;
  _order: any;
  rangeValues: number[] = [20, 80];
  layout: number = 3;
  sort: number = 0;
  products: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.products;
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.category = params.get('category');
    });

    this.route.queryParamMap.subscribe((queryParams) => {
      this._sort = queryParams.get('_sort');
      this._order = queryParams.get('_order');
    });
    if (this._sort || this._order) {
      this._sort === 'price' && this.sortPrice(this._order);
      this._sort === 'rating' && this.sortRating(this._order);
    } else {
      this.getAllProducts();
    }
  }

  handleLayout(grid: number) {
    this.layout = grid;
  }

  getAllProducts() {
    getAllProductsApi(this.category, this.apiService).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  sortPrice(order: string) {
    this.router
      .navigate(['/products', this.category], {
        queryParams: { _sort: 'price', _order: order },
      })
      .then(() => {
        sortPriceApi(this._order, this.category, this.apiService).subscribe(
          (data) => {
            this.products = data;
          },
          (error) => {
            console.log(error);
          }
        );
      });
  }

  sortRating(order: string) {
    this.router
      .navigate(['/products', this.category], {
        queryParams: { _sort: 'rating', _order: order },
      })
      .then(() => {
        sortRatingApi(this._order, this.category, this.apiService).subscribe(
          (data) => {
            this.products = data;
          },
          (error) => {
            console.log(error);
          }
        );
      });
  }

  handleSort(grid: number, type: string) {
    this.sort = grid;
    if (type === 'plow') {
      this.sortPrice('asc');
    } else if (type === 'phigh') {
      this.sortPrice('desc');
    } else if (type === 'rlow') {
      this.sortRating('asc');
    } else if (type === 'rhigh') {
      this.sortRating('desc');
    } else return;
  }
}
