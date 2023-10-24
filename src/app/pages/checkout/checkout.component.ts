import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/service/common.service';
import { allState } from 'src/utils/coupons';
import { MessageService } from 'primeng/api';
import { AddressService } from 'src/service/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  isStateOpen: boolean = false;
  isDistrictOpen: boolean = false;
  isStateTouched: boolean = false;
  isDistrictTouched: boolean = false;
  allStates: any;
  selectState: any;
  stateValue: any;
  selectDistrict: any;
  enableCheckout: boolean = false;
  form: FormGroup;
  initialFormData: any;
  allAddress:any;
  isFormChanged:boolean=false;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private addressService:AddressService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      pincode: ['', Validators.required],
      locality: ['', Validators.required],
      address: ['', Validators.required],
      state: '',
      district: '',
      landmark: '',
      alternatePhone: '',
      addressType: 'home',
    });

    this.initialFormData = this.form.value;
  }
  ngOnInit() {
    this.allStates = allState.states;
    this.commonService.postCheckoutStatus(true);
    this.router.navigate(['/checkout']);
    this.enableCheckout = JSON.parse(
      localStorage.getItem('enableCheckout') || 'false'
    );
    this.addressService.address$.subscribe((data) => {
      this.allAddress = data;
    });
    this.selectDistrict = '';
    this.stateValue = '';
    // const savedFormData = localStorage.getItem('formData');
    // if (savedFormData) {
    //   let { state, district } = JSON.parse(savedFormData);
    //   this.stateValue = state;
    //   this.selectDistrict = district;
    //   this.form.setValue(JSON.parse(savedFormData));
    // }

    this.form.valueChanges.subscribe((formData) => {
      this.isFormChanged = true;
      localStorage.setItem('formData', JSON.stringify(formData));
    });
  }
  submitForm() {
    this.form.value.state = this.stateValue;
    this.form.value.district = this.selectDistrict;
    this.enableCheckout = true;
    localStorage.setItem('enableCheckout', JSON.stringify(this.enableCheckout));
    // localStorage.setItem('formData', JSON.stringify(this.form.value));
    this.isFormChanged && this.addAddressFunc(this.form.value);
  }

  addAddressFunc(item: any) {
    this.addressService.addAdress(item).then((result) => {
      if (result) {
        this.isFormChanged = false;
        this.messageService.clear();
        this.messageService.add({
          key: 'tc',
          severity: 'success',
          summary: 'Added',
          detail: 'Address saved Successfully',
        });
      } else {
        this.messageService.clear();
        this.messageService.add({
          key: 'tc',
          severity: 'error',
          detail: 'Couldnt add to Wishlist',
        });
      }
    });
  }
  handleFunc(type: string, item?: any) {
    if (type === 'state') {
      this.isStateTouched = true;
      this.isStateOpen = !this.isStateOpen;
    } else if (type === 'district') {
      this.isDistrictTouched = true;
      item && (this.isDistrictOpen = !this.isDistrictOpen);
    } else if (type === 'stateSelect') {
      this.selectState = item;
      this.selectDistrict = '';
      this.stateValue = this.selectState.state;
    } else if (type === 'districtSelect') {
      this.selectDistrict = item;
    } else if (type === 'saveAddress') {
      this.enableCheckout = true;
    } else if (type === 'cancel') {
      this.isStateTouched = false;
      this.isDistrictTouched = false;
      this.selectDistrict = '';
      this.stateValue = '';
      this.form.reset(this.initialFormData);
    }
  }
}
