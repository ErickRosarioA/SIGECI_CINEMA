import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './utils/auth.guard';
import { CustomHttpInterceptor } from './utils/custom-http.interceptor';
import { WelcomeCardComponent } from './pages/welcome-card/welcome-card.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SharedModule } from './shared/shared.module';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({ declarations: [
        AppComponent,
        WelcomeCardComponent,
        AdminLayoutComponent
    ],
    bootstrap: [AppComponent], imports: [SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgxSpinnerModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        NgxMaskDirective,
        NgxMaskPipe,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: [environment.API_DOMAIN],
                disallowedRoutes: [],
            }
        })], providers: [provideNgxMask(), DatePipe, ToastrService, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
