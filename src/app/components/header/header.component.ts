import { Component, OnInit } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [LoginComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  logout() {
    this.loginService.clear();
  }
}
