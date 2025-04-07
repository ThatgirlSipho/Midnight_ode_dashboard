import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  
})
export class HeaderComponent implements OnInit {
userEmail:string='';
loggedin$!:Observable<boolean>;
constructor(
  private auths: AuthService
){}

 ngOnInit(): void {
   const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  console.log('user',user)
  this.userEmail= user?.email;  
  this.loggedin$= this.auths.isLoggedIn()
 }

 onLogout(){
  this.auths.logout()
 }

 
}
