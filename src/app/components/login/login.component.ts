import { Component, OnInit } from '@angular/core';
// import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // loginForm = new FormGroup({
  //   email: new FormGroup('', [Validators.required, Validators.email]),
  //   password: new FormGroup('', [Validators.required]),
  // });

  loginForm: any = FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    console.log(this.loginForm.value.email);

    if (!this.loginForm.valid) {
      return;
    }


    // const auth = getAuth();
    // signInWithEmailAndPassword(auth, this.loginForm.value.email, this.loginForm.value.password)
    //   .then((result) => {
    //     const user = result.user;
    //     console.log(user.email);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage);
    //   });


    const { email, password } = this.loginForm.value;

    this.authService.login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: 'There was an error'
        })
      )

      .subscribe(() => {
        this.router.navigate(['/home']);
      });
  }



}
