import { Component } from '@angular/core';
import { ApiService } from 'src/service/testapi.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
})
export class FeaturedComponent {
  featuredData: any;

  constructor(private apiService: ApiService) {
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
