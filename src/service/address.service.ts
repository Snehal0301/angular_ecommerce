import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './testapi.service';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private addressSubject = new BehaviorSubject<any[]>([]);
  address$: Observable<any[]> = this.addressSubject.asObservable();
  constructor(private apiService: ApiService) {
    this.fetchAddress();
  }

  fetchAddress() {
    this.apiService.getAddress().subscribe(
      (response) => {
        this.addressSubject.next(response);
      },
      (err) => {
        console.log('Error', err);
      }
    );
  }

  addAdress(item: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.apiService.addAddress(item).subscribe(
        (response) => {
          const newAddress = this.addressSubject.value.concat(item);
          this.addressSubject.next(newAddress);
          console.log('Added address', response);
          resolve(true);
        },
        (error) => {
          console.error('Error:', error);
          resolve(false);
        }
      );
    });
  }
}
