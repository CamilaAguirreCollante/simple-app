import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDTO } from 'src/app/models/DTOs/user-dto';
import { AuthService } from 'src/app/services/auth.service';
import { encrypt } from 'src/app/util/crypt';

declare var bootstrap: any; // Bootstrap 5

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  
  private failToast: any;
  private toast: any;

  toastMessage: string = '';
  emailExist: boolean = false;
  userNameExist: boolean = false;

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
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

  showToast(message: string, field: string){
    this.toastMessage = message;
    if(field == 'e'){
      this.emailExist= true;
      this.signUpForm.get('email')?.reset();
    } else if (field == 'u'){
      this.userNameExist= true;
      this.signUpForm.get('userName')?.reset();
    } else{
      this.emailExist= true;
      this.userNameExist= true;
      this.signUpForm.get('email')?.reset();
      this.signUpForm.get('userName')?.reset();
    }
    this.signUpForm.get('password')?.reset();
    this.failToast.show();
  }

  async signUp(){
    //Fail toast initialized
    var signUpFailToast = document.getElementById('signUpFailToast');
    this.failToast = new bootstrap.Toast(signUpFailToast);
    // Success toast initialized
    var signUpToast = document.getElementById('signUpToast');
    this.toast = new bootstrap.Toast(signUpToast);
    //
    this.emailExist = false;
    this.userNameExist = false;
    const encryptedPassword = encrypt(this.signUpForm.value.password);
    const userNameExist = await this.authService.checkUserName(this.signUpForm.value.userName);
    const emailExist = await this.authService.checkEmail(this.signUpForm.value.email);
    if(!userNameExist && !emailExist){
      let user = new UserDTO(
        this.signUpForm.value.name,
        this.signUpForm.value.lastName,
        this.signUpForm.value.userName,
        this.signUpForm.value.email,
        encryptedPassword
      );
      this.authService.addUser(user);
      this.toast.show();
      setTimeout(() => {
        this.navigate('sign-in');
      }, 750);
    } else if (userNameExist && emailExist){
      this.showToast("Nombre de usuario y correo existentes.", 'b');
    } else if(userNameExist){
      this.showToast("Nombre de usuario existente.", 'u');
    } else {
      this.showToast("Correo electrónico existente.", 'e');
    }
  }

}
