import { Injectable,inject } from '@angular/core';
import { Auth,signInWithEmailAndPassword, UserCredential,onAuthStateChanged  } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
 
})
export class AuthService {
  loggedIn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  isLoggedInGaurd:boolean=false
  private auths = inject(Auth);
  private toastr = inject(ToastrService);

  constructor( private router: Router,) { }

  async login(email: string, password: string): Promise<UserCredential | null> {
    try {
      console.log(email,password)
      const userCredential = await signInWithEmailAndPassword(this.auths, email, password);
      console.log('Logged in:', userCredential.user);
      this.toastr.success('Logged in successfully!', 'Success');
      this.loadUser();
      this.loggedIn.next(true)
      this.router.navigate(['/dashboard'])
      this.isLoggedInGaurd=true
      // Navigate or store token if needed
      return userCredential;
    } catch (error:any) {
      console.error('Login error:', error);
      this.toastr.error(error.message || 'Login failed', 'Error');
      throw error; // Let the component handle UI errors
      
    }
  }

   loadUser(){
     onAuthStateChanged(this.auths, (user) => {
      localStorage.setItem('user', JSON.stringify(user));
    }); 
  }

  async logout(){
    this.auths.signOut().then(()=> 
    this.toastr.success('User logged out successfully!'));
    localStorage.removeItem('user');
    this.loggedIn.next(false)
    this.router.navigate(['/login'])
    this.isLoggedInGaurd=false
  }
  isLoggedIn(){
  return this.loggedIn.asObservable()
  }
}
