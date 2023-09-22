import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/DTOs/user-dto';
import { DatabaseService } from 'src/app/services/database.service';
import { encrypt } from 'src/app/util/crypt';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private DBService: DatabaseService
  ){
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  ngOnInit(){}

  navigate(route: string){
    this.router.navigate([route])
  }

  signUp(){
    const encryptedPassword = encrypt(this.signUpForm.value.password);
    //console.log(encryptedPassword);
    let user = new UserDTO(
      this.signUpForm.value.name,
      this.signUpForm.value.lastName,
      this.signUpForm.value.userName,
      this.signUpForm.value.email,
      encryptedPassword
    );
    // console.log(user);
    this.DBService.addUser(user);
  }

}
