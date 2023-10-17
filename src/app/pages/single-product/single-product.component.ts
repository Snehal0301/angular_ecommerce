import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MyApiService } from 'src/service/testapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss'],
  providers: [MessageService],
})
export class SingleProductComponent {
  value: number;
  imgValue: any = '';
  selectedSize: any = '';
  singleProductData: any;
  toast: boolean = false;
  id: string | null;

  constructor(
    private apiService: MyApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.value = 1;
    this.id = '';
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const catParam = this.route.snapshot.paramMap.get('category');

    window.scrollTo(0, 0);

    if(idParam!==null){
      this.id = idParam;
      if(catParam === 'mens'){
        this.apiService.getSingleMensProduct(this.id).subscribe(
          (data) => {
            this.singleProductData = data;
            this.imgValue = this.singleProductData.images[0];
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }else if(catParam === 'womens'){
        this.apiService.getSingleWomensProduct(this.id).subscribe(
          (data) => {
            this.singleProductData = data;
            this.imgValue = this.singleProductData.images[0];
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    }
  }

  currentClass(size: string): string {
    return size === this.selectedSize
      ? 'singleProduct-size-click'
      : 'singleProduct-size';
  }
  imageClass(image: string): string {
    return image === this.imgValue
      ? 'singleImage-border'
      : 'singleImage-default';
  }
  handleFunction(type: string, value?: string) {
    if (type === 'size') {
      this.selectedSize = value;
    } else if (type === 'image') {
      this.imgValue = value;
    } else if (type === 'qty') {
      if (value === '-') {
        if (this.value <= 1) return;
        this.value--;
      }
      if (value === '+') {
        if (this.value < 1) return;
        this.value++;
      }
    } else if (type === 'cart') {
      this.messageService.clear();
      this.messageService.add({
        key: 'tc',
        severity: 'success',
        summary: 'Success',
        detail: 'Added to cart',
      });
      // this.messageService.add({
      //   key: 'tc',
      //   severity: 'error',
      //   summary: 'Error',
      //   detail: 'Could not add product to cart',
      // });
    } else return;
  }
}
