import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from "./shared/token.interceptor";
import { OverviewComponent } from './overview/overview.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { LoaderComponent } from './loader/loader.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { PositionFormComponent } from './categories-page/categories-form/position-form/position-form.component';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    PageNotFoundComponent,
    RegisterComponent,
    OverviewComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PositionFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
