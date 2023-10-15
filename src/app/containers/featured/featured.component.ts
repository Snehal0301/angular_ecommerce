import { Component } from '@angular/core';
import { MyApiService } from 'src/service/testapi.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent {
  featuredData: any;

  constructor(private apiService: MyApiService) {
    this.featuredData;
  }

  ngOnInit() {
    this.apiService.getFeaturedData().subscribe(
      (data) => {
        this.featuredData = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
