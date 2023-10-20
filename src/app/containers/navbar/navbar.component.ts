import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiService } from 'src/service/testapi.service';
import { WishlistService } from 'src/service/wishlist.service';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  scrolled: boolean = false;
  isCartOpen: boolean = false;
  isSuggested: boolean = false;
  position:
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'topleft'
    | 'topright'
    | 'bottomleft'
    | 'bottomright' = 'right';
  isMobile: boolean = false;
  countries?: any[];
  formGroup!: FormGroup; 
  filteredCountries: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private wishlistService: WishlistService
  ) {}

  wishlist:any;

  ngOnInit() {

    this.formGroup = this.fb.group({
      selectedCountry: new FormControl<object | null>(null),
    });

    this.wishlistService.wishlist$.subscribe((data) => {
      this.wishlist = data;
    });

    // this.apiService.getWishlist().subscribe(
    //   (response) => {
    //     this.wishlist = response;
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );
  }



  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Detect scroll events here
    this.scrolled = window.scrollY > 0; // Change the condition as needed
  }
  styleBadge: any = {
    'background-color': '#fff',
    color: '#30568d',
    cursor: 'pointer',
    padding: '20px',
  };
  rightsheetStyle: any = {
    width: '400px',
    height: '100vh',
    maxHeight: '100%',
    margin: '0',
  };

  openCart() {
    this.isCartOpen = true;
  }

  handleClick(){
    this.isSuggested = !this.isSuggested;
  }
}
