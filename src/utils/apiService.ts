import { Observable } from 'rxjs';
import { ApiService } from '../service/testapi.service';

export const getAllProductsApi = (
  category: string,
  apiService: ApiService
): Observable<any> => {
  if (category === 'mens') {
    return apiService.getMensProduct();
  } else if (category === 'womens') {
    return apiService.getWomensProduct();
  }
  return new Observable();
};

export const updateProduct = (
  category: string,
  apiService: ApiService,
  id:string,
  updatedData: any
): Observable<any> => {
  if (category === 'mens') {
    return apiService.updateMensProduct(id, updatedData);
  }else if(category === 'womens'){
    return apiService.updateWomensProduct(id, updatedData);
  }
  return new Observable();
};

export const sortPriceApi = (
  order: string,
  category: string,
  apiService: ApiService
): Observable<any> => {
  if (category === 'mens') {
    return apiService.getMensProduct('price', order);
  } else if (category === 'womens') {
    return apiService.getWomensProduct('price', order);
  }
  return new Observable();
};

export const sortRatingApi = (
  order: string,
  category: string,
  apiService: ApiService
): Observable<any> => {
  if (category === 'mens') {
    return apiService.getMensProduct('rating', order);
  } else if (category === 'womens') {
    return apiService.getWomensProduct('rating', order);
  }
  return new Observable();
};
