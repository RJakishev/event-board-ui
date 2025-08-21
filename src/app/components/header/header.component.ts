import { Component, OnInit } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [LoginComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit{

  // email!: string;
  // password!: string;
  isLoggedIn!: boolean;

  constructor(private loginService: LoginService) {

  }
  
  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();    
  }


  // login() {
  //   debugger;
  //   this.loginService.login(this.email, this.password).subscribe({
  //     next: r => {
  //       this.loginService.setToken(r.token);
  //       this.isLoggedIn = true;
  //       debugger
  //       console.log(r.token);
        
  //       // location.reload();
        
  //                       // this.router.navigateByUrl('/');
  //     },
  //     error: err => alert(err?.error?.error ?? 'Login failed')
  //   });
  // }
  logout() { 
    this.loginService.clear(); 
  }

}
