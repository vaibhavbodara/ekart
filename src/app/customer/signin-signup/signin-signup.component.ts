import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { state } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  // providers:[HttpClientModule,LoginSignupService],
  imports: [CommonModule, RouterLink, HttpClientModule,],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent {

  regForm: boolean = false;
  signUpform!: FormGroup;
  signInform!: FormGroup;
  signUpsubmitted = false;
  href: string = '';
  user_data: any;
  user_dto!: User;
  user_reg_data: any;
  signInFormValue: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginSignupService) {

  }

  ngOnInit() {
    this.href = this.router.url;
    if (this.href == '/sign-up') {
      this.regForm = true;
    } else if (this.href == '/sign-in') {
      this.regForm = false;
    }

    this.signUpform = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      role: ['', Validators.required],
      mobNumber: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      language: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      agreetc: ['', Validators.required],
      age: ['', Validators.required],
      aboutYou: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  get rf() {
    return this.signUpform.controls;
  }

  onSubmitSignUp() {
    this.signUpsubmitted = true;
    if (this.signUpform.invalid) {
      return;
    }
    this.user_reg_data = this.signUpform.value;
    this.user_dto = {
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      uploadPhoto: this.user_reg_data.gender,
      role: this.user_reg_data.role,
      
    }
    this.loginService.userRegister(this.user_dto).subscribe(data => {
      alert("User Register Successfull 0");
      this.router.navigateByUrl('/sign-in');
    })
  }
}


