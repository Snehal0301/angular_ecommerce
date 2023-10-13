import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  expertise:any=[
    {
      src:'../../../assets/van.png',
      title:'Free Shipping',
      para:'On all orders over ₹500'

    },
    {
      src:'../../../assets/customer-service.png',
      title:'Dedicated Support',
      para:'Quick response 24/7'
    },
    {
      src:'../../../assets/money.png',
      title:'Money Back Gurantee',
      para:'Worry free shopping'

    }
  ]

  category:any=[
    {
      src:'../../../assets/glasses-category-img-1.jpg',
      title:"Women's Wear",
    },
    {
      src:'../../../assets/glasses-category-img-2.jpg',
      title:"Men's Wear"
    },
    {
      src:'../../../assets/retail-black-friday-small-banner-1-opt.jpg',
      title:'Shoes',
    },
    {
      src:'../../../assets/retail-black-friday-small-banner-2-opt.jpg',
      title:"Gadget's",
    },
    {
      src:'../../../assets/retail-black-friday-small-banner-4-opt.jpg',
      title:"Kid's",
    },
    {
      src:'../../../assets/baner-flat-fashion-7.jpg',
      title:"Bag's",
    },
    {
      src:'../../../assets/skincare.png',
      title:"Skincare",
    },
    {
      src:'../../../assets/watch_category.webp',
      title:"Watch",
    }
  ]

}
