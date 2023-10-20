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
  layout: string = localStorage.getItem('gridlayout') || 'list';
  sort: number = 0;
  products: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    this.products;
    for (const size of this.allFilters.size) {
      this.sizeCheckboxStates[size] = false;
    }
    for (const rating of this.allFilters.rating) {
      this.ratingCheckboxStates[rating] = false;
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    if (localStorage.getItem('gridlayout') === null) {
      localStorage.setItem('gridlayout', 'list');
    }
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

  filterContent: {
    size: string[];
    rating: string[];
  } = {
    size: ['S', 'M', 'L', 'XL'],
    rating: ['4★ & above', '3★ & above', '2★ & above'],
  };

  allFilters: any = {
    size: [],
    rating: [],
  };

  ratingCheckboxStates: { [key: string]: boolean } = {};
  sizeCheckboxStates: { [key: string]: boolean } = {};
  selectedFilters: string[] = [];

  // updateFilters(type: string, item: any) {
  //   if (this.allFilters[type].includes(item)) {
  //     this.allFilters[type] = this.allFilters[type].filter((value:any) => value !== item);
  //   } else {
  //     this.allFilters[type].push(item);
  //   }

  //   if (type === 'size') {
  //     this.sizeCheckboxStates[item] = !this.sizeCheckboxStates[item];
  //   } else if (type === 'rating') {
  //     this.ratingCheckboxStates[item] = !this.ratingCheckboxStates[item];
  //   }
  //   this.allFilters.combined = [...this.allFilters.size, ...this.allFilters.rating];
  // }

  updateFilters(type: string, item: any) {
    if (this.allFilters[type].includes(item)) {
      this.allFilters[type] = this.allFilters[type].filter(
        (value: any) => value !== item
      );
    } else {
      this.allFilters[type].push(item);
    }
  }

  handleLayout(grid: string) {
    localStorage.setItem('gridlayout', grid);
    this.layout = grid;
    console.log(this.allFilters);
  }

  clearFilters(type: string) {
    if (type === 'all') {
      this.allFilters = {
        size: [],
        rating: [],
      };
      this.sizeCheckboxStates = {};
      this.ratingCheckboxStates = {};
    } else if (type === 'size') {
      this.allFilters.size = [];
      this.sizeCheckboxStates = {};
    } else if (type === 'rating') {
      this.allFilters.rating = [];
      this.ratingCheckboxStates = {};
    }
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
