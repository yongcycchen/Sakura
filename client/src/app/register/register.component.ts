import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup={}as FormGroup;
  bsConfig : Partial<BsDatepickerConfig>={};
  maxDate: Date={}as Date;
  validationErrors:string[]=[];
  
  constructor(private accountService:AccountService, private toastr: ToastrService,
     private fb:FormBuilder, private router:Router) {
    this.bsConfig = {
      containerClass:'theme-red',
      dateInputFormat:'MM/DD/YYYY'
    }
    this.maxDate = new Date();
    this.maxDate.setUTCFullYear(this.maxDate.getUTCFullYear()-18);
  }

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm(){
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['',Validators.required],
      knownAs: ['',Validators.required],
      dateOfBirth: [''.toString(),Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
        password: ['',[Validators.required,
            Validators.minLength(6),Validators.maxLength(10)]],
        confirmPassword: ['',[Validators.required]]}
        ,{validator: this.MustMatch('password','confirmPassword')})
    // this.registerForm = new FormGroup({
    //   username: new FormControl('hello',Validators.required),
    //   password: new FormControl('',[Validators.required,
    //       Validators.minLength(4),Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('',[Validators.required, this.matchValues('password')])})
  }

  // matchValues(matchTo:string):ValidatorFn{
  //   return (control:AbstractControl) =>{
  //     return control?.value === control?.parent?.controls[matchTo].value 
  //     ? null : {notSame:true}
  //   }
  // }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ notSame: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  register(){
    this.accountService.register(this.registerForm.value).subscribe(response=>{
      this.router.navigateByUrl('/members');
    },error=>{
      this.validationErrors = error;
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
