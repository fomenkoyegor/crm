import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard, NoAuthGuard} from './shared/guardds/auth.guard';
import {OverviewComponent} from './overview/overview.component';
import {AnalyticsPageComponent} from './analytics-page/analytics-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {CategoriesPageComponent} from './categories-page/categories-page.component';
import {CategoriesFormComponent} from './categories-page/categories-form/categories-form.component';
import {OrderCategoriesComponent} from './order-page/order-categories/order-categories.component';
import {OrderPositionsComponent} from './order-page/order-positions/order-positions.component';

const routes: Routes = [
  {path: '', redirectTo: 'overview', pathMatch: 'full'},
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'analytics', component: AnalyticsPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {
        path: 'order', component: OrderPageComponent, children: [
          {path: '', component: OrderCategoriesComponent},
          {path: ':id', component: OrderPositionsComponent},
        ]
      },
      {path: 'categories', component: CategoriesPageComponent},
      {path: 'categories/new', component: CategoriesFormComponent},
      {path: 'categories/:id', component: CategoriesFormComponent},
    ]
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
