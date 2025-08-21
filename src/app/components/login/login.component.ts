import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: any;

  email: string = 'admin@example.com';
  password: string = 'secret123';

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }


  login() {
    this.loginService.login(this.email, this.password).subscribe({
      next: r => {
        this.loginService.setToken(r.token)
        location.reload();
      },
      error: err => alert(err?.error?.error ?? 'Login failed')
    });
  }
  logout() {
    this.loginService.clear();
  }

  onSubmit(): void {
    this.login();
  }
}
