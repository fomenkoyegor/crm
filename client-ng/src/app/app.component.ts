import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/servises/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    const potToken = localStorage.getItem('token');
    if (potToken !== null) {
      this.auth.setToken(potToken)
    }
  }
}
