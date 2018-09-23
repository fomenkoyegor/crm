import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../shared/servises/auth.service';
import {Subscription} from 'rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {MaterialToastService} from "../shared/material-toast.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  asObs: Subscription;

  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['registred']) {
          // ТЕПЕРЬ МОЖЕТЕ ЗАЙТИ НА СТРАНИЦУ ИСПОЛЬЗУЯ СВОИ ДАННЫЕ
          MaterialToastService.toast('ТЕПЕРЬ МОЖЕТЕ ЗАЙТИ НА СТРАНИЦУ ИСПОЛЬЗУЯ СВОИ ДАННЫЕ')

        } else if (params['accesDenied']) {
          // Для начала авторизируйся
          MaterialToastService.toast('Для начала авторизируйся')

        } else if (params['sessionFailed']) {
          // Токен протух
          MaterialToastService.toast('Время вышло, войдите снова')

        }
      }
    )

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }

  ngOnDestroy() {
    if (this.asObs) {
      this.asObs.unsubscribe();
    }

  }

  onSubmit() {
    // this.form.disable();
    this.asObs = this.authService.login(this.form.value).subscribe(
      res => {
        console.log(res);
        MaterialToastService.toast('login succes');
        this.router.navigate(['/'])
      },
      err => {
        // this.form.enable();
        console.log(err);
        MaterialToastService.toast(err.error.message)
      }
    )

  }

}
