import { Component } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {
  like:boolean = false;

  featured:any=[
    {
      src:'../../../assets/featured/mens-1.jpg',
      productName:"Product 1",
      productPrice:'999'
    },
    {
      src:'../../../assets/featured/mens-2-1.png',
      productName:"Product 2",
      productPrice:'1099'
    },
    {
      src:'../../../assets/featured/shoe-1-1 (2).jpg',
      productName:"Product 3",
      productPrice:'3299'
    },
    {
      src:'../../../assets/featured/shoe-2-1 (1).jpg',
      productName:"Product 4",
      productPrice:'3599'
    },
    {
      src:'../../../assets/featured/women-1-1 (2).jpg',
      productName:"Product 5",
      productPrice:'1299'
    },
    {
      src:'../../../assets/featured/women-2-1 (3).jpg',
      productName:"Product 6",
      productPrice:'2299'
    },
    {
      src:'../../../assets/featured/bags-1-1 (5).jpg',
      productName:"Product 7",
      productPrice:'599'
    },
    {
      src:'../../../assets/featured/bags-2-1 (5).jpg',
      productName:"Product 8",
      productPrice:'799'
    },
  ]

  handleClick = () => {
    this.like = !this.like;
  }

}
