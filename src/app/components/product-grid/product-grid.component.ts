import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss']
})
export class ProductGridComponent {
  like:boolean = false;
  @Input() data: any;

  constructor(){
    this.data;
  }

  ngOnInit() {

    // Initialize the formGroup using FormBuilder
    console.log('data',this.data)
  }
  
  handleClick = () => {
    this.like = !this.like;
  }
}
