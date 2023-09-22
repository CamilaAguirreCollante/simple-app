import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private DBService: DatabaseService
  ){
    this.signInForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(){}

  navigate(route: string){
    this.router.navigate([route])
  }

  async signIn(){
    const $userFound = await this.DBService.getUser(this.signInForm.value.userName, this.signInForm.value.password);
    if($userFound!= null){
       this.navigate('dashboard');
    } 
  }
}
