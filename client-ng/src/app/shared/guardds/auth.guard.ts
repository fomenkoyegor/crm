import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "../servises/auth.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private  auth: AuthService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthentificated()) {
      return of(true);
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          accesDenied: true
        }
      });
      return of(false);
    }

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}


@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanActivateChild {
  constructor(private  auth: AuthService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthentificated()) {
      this.router.navigate(['/order']);
      return of(false);
    }

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
