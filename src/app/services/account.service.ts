import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ILogin, ISignUp, IToken, ITokenData } from '../utils/models/account';
import { IResponseModel } from '../utils/models/response';

const TOKEN_REPOSITORY_NAME: string = 'token';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public redirectUrl: string = '';
  private readonly baseUrl = environment.API_URL;

  constructor(private jwtHelper: JwtHelperService, private router: Router, private httpClient: HttpClient) { }

  isAuthenticated(): boolean {

    const token = this.getToken()

    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string {
    let token = localStorage.getItem(TOKEN_REPOSITORY_NAME);

    token = token == 'null' ? null : token;

    return token ? token : '';
  }

  setToken(token:string){
    localStorage.setItem(TOKEN_REPOSITORY_NAME,token);
  }

  getUserId(): number{
    const tokenData = this.getTokenData();
    const userId = tokenData?.identifier;

    return userId ? +userId : 0;
  }

  getTokenData(): ITokenData | null {

    const token = this.getToken();

    let data: ITokenData | null = this.jwtHelper.decodeToken(token);

    if(!data){
      return data;
    }

    try{
      data!.role = this.jwtHelper.decodeToken(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      data!.identifier = this.jwtHelper.decodeToken(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      data!.name = this.jwtHelper.decodeToken(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    }catch{

    }

    return data;
  }

  private getRouteByRole(role: string | undefined) {

    let route: string = '';

    if (this.redirectUrl) {

      route = this.redirectUrl;
      this.redirectUrl = '';

    } else {
      route = '/admin'
    }

    return route;
  }

  doLoginNavigate(){
    const role = this.getTokenData()?.role;
    const toRoute = this.getRouteByRole(role);

    this.router.navigate([toRoute]);
  }

  logOut() {
    localStorage.removeItem(TOKEN_REPOSITORY_NAME);
    this.router.navigate(['/account']);
  }

  doLogin(model: ILogin){
    return this.httpClient.post<IResponseModel<IToken>>(`${this.baseUrl}/Authenticate/login`,model);
  }

  registerUser(model: ISignUp){
    return this.httpClient.post<IResponseModel<any>>(`${this.baseUrl}/Authenticate/SignUp`,model);
  }

}

