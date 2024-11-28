import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IResponseModel } from '../utils/models/response';
import { ICountryStateView, ICountryView } from '../utils/models/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly baseUrl = environment.API_URL;

  constructor( private httpClient: HttpClient) { }

  getCountriesList(){
    return this.httpClient.get<IResponseModel<ICountryView>>(`${this.baseUrl}/Addresses/Countries`);
  }

  getStatesList(){
    return this.httpClient.get<IResponseModel<ICountryStateView>>(`${this.baseUrl}/Addresses/States`);
  }
}
