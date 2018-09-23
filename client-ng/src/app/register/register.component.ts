import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/servises/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MaterialToastService} from "../shared/material-toast.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  asObs: Subscription;
  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        
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
    this.form.disable();
    this.asObs = this.authService.register(this.form.value).subscribe(
      res => {
        this.router.navigate(['/login'], {
          queryParams: {
            registred: true
          }
        })
        console.log(res)
      },
      err => {
        this.form.enable();
        console.log(err);
        MaterialToastService.toast(err.error.message);
      }

    )

  }
}
