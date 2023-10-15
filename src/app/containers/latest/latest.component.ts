import { Component } from '@angular/core';
import { MyApiService } from 'src/service/testapi.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent {
  latestData: any;

  constructor(private apiService: MyApiService) {
    this.latestData;
  }

  ngOnInit() {
    this.apiService.getLatestData().subscribe(
      (data) => {
        this.latestData = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  // productList:any=[
  //   {
  //     src:'../../../assets/latest/1.webp',
  //     productName:"Product 1",
  //     productPrice:'999'
  //   },
  //   {
  //     src:'../../../assets/latest/2.webp',
  //     productName:"Product 2",
  //     productPrice:'1099'
  //   },
  //   {
  //     src:'../../../assets/latest/3.webp',
  //     productName:"Product 3",
  //     productPrice:'3299'
  //   },
  //   {
  //     src:'../../../assets/latest/4.webp',
  //     productName:"Product 4",
  //     productPrice:'3599'
  //   },
  //   {
  //     src:'../../../assets/latest/5.webp',
  //     productName:"Product 5",
  //     productPrice:'1299'
  //   },
  //   {
  //     src:'../../../assets/latest/6.webp',
  //     productName:"Product 6",
  //     productPrice:'2299'
  //   },
  //   {
  //     src:'../../../assets/latest/7.webp',
  //     productName:"Product 7",
  //     productPrice:'599'
  //   },
  //   {
  //     src:'../../../assets/latest/8.webp',
  //     productName:"Product 8",
  //     productPrice:'799'
  //   },
  // ]
}
