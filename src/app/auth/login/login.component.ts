import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
constructor(private auths: AuthService){}
ngOnInit(): void {
  
}
onSubmit(formValues:any){
  console.log('form values', formValues)
 this.auths.login(formValues.email, formValues.password);
}


}
