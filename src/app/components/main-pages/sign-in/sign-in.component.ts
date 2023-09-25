import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

declare var bootstrap: any; // Bootstrap 5

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  private toast: any;

  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Form initialized
    this.signInForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit() { }

  navigate(route: string) {
    this.router.navigate([route])
  }

  async signIn() {
    const $userFound = await this.authService.signIn(this.signInForm.value.userName, this.signInForm.value.password);
    if ($userFound != null) {
      this.navigate('dashboard');
    } else {
      this.signInForm.reset();
      //Toast initialized
      var signInToast = document.getElementById('signInToast');
      this.toast = new bootstrap.Toast(signInToast);
      this.toast.show();
    }
  }
}
