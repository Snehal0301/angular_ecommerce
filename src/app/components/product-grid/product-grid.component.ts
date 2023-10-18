import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent {
  like:boolean = false;
  @Input() data: any;
  @Input() gridlayout: any;
  @Input() location: any;
  parentClass: string = 'products-grid';

  constructor(){
    this.data;
    this.gridlayout;
  }

  getGridStyles() {
    if (this.gridlayout === 3) {
      return {
        'display': 'grid',
        'grid-template-columns': 'repeat(auto-fit, minmax(350px, 1fr)',
        'gap': '20px'
      };
    } else if (this.gridlayout === 4) {
      return {
        'display': 'grid',
        'grid-template-columns': 'repeat(auto-fit, minmax(250px, 1fr)',
        'gap': '20px'
      };
    }
    return {};
  }

  
  handleClick = () => {
    this.like = !this.like;
  }
}
