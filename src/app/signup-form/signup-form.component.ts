import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalComponent } from 'src/global-component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  isLoading:boolean=false;
  isUsername:boolean=false;
  AboveError:boolean=false;
  isEmail:boolean=false;
  isSignupSuccessfull=false;
  Error:any=null;
  Error2:any=null;
  regex:any=null;
  passwordType:string="password";
  username:string="";
  
  constructor(public http:HttpClient,public router:Router,public userService:UserService) { 

  }
  signupForm=new FormGroup({
    firstnameFormControl:new FormControl('',[Validators.required]),
    lastnameFormControl:new FormControl('',[Validators.required]),
    nameFormControl:new FormControl('',[Validators.required,Validators.pattern('^.{4,}$')]),
    emailFormControl:new FormControl('',[Validators.required,Validators.pattern(this.regex=new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'))]),
    passwordFormControl:new FormControl('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}$')]),
  })
  public get firstnameFormControl(){
    return this.signupForm.get('firstnameFormControl') as FormControl;
  }
  public get lastnameFormControl(){
    return this.signupForm.get('lastnameFormControl') as FormControl;
  }
  public get nameFormControl(){
    return this.signupForm.get('nameFormControl') as FormControl;
  }
  public get emailFormControl(){
    return this.signupForm.get('emailFormControl') as FormControl;
  }
  public get passwordFormControl(){
    return this.signupForm.get('passwordFormControl') as FormControl;
  }

  ngOnInit(): void {
  }


  changeVisible(){

    if (this.passwordType=="password") {
        this.passwordType="text";
    }else{
      this.passwordType="password";
    }
  }



  checkemail(){
    console.log(this.signupForm.value);
      let url=GlobalComponent.apiUrl+"user/checkemail";
      let body={
          email:this.signupForm.value['emailFormControl']
      }
      console.log('body -> ',body);
      this.userService.Signup(url,body).subscribe(
        (r:any)=>{
            this.isLoading=false;
            this.isEmail=r;
            if (this.isEmail) {
              this.Error2={
                error:{
                  error:"Email Already Exists"
                }
              }
            }else{
              this.Error2={
                error:{
                  error:""
                }
              }
            }
        },
        e=>{
          this.isLoading=false;
          console.log('error => ',e)
          this.Error=e;
        }
        
      )
      

  }

  checkUsername(){
    console.log(this.signupForm.value);
      let url=GlobalComponent.apiUrl+"user/checkusername";
      let body={
          username:this.signupForm.value['nameFormControl']
      }
      console.log('body -> ',body);
      this.userService.Signup(url,body).subscribe(
        (r:any)=>{
            this.isLoading=false;
            this.isUsername=r;
            if (this.isUsername) {
              this.Error={
                error:{
                  error:"User is already registered with this Username. Try a Different One"
                }
              }
            }else{
              this.Error={
                error:{
                  error:""
                }
              }
            }
             
        },
        e=>{
          this.isLoading=false;
          console.log('error => ',e)
          this.Error=e;
        }
      )
      

  }
  onSubmit(){
    this.username=this.signupForm.value['nameFormControl'];
    this.username=this.username.trim();
    if(!this.isUsername && !this.isEmail){
      this.AboveError=false
      if(this.signupForm.valid){
        this.isLoading=true;
        console.log(this.signupForm.value);
        let url=GlobalComponent.apiUrl+"user/signup";
        let body={
            username:this.username,
            firstName:this.signupForm.value['firstnameFormControl'],
            lastName:this.signupForm.value['lastnameFormControl'],
            email:this.signupForm.value['emailFormControl'],
            password:this.signupForm.value['passwordFormControl'],
        }
        console.log('body -> ',body);
        this.userService.Signup(url,body).subscribe(
          (r:any)=>{
              this.isLoading=false;
              if(r.responseCode!=1){
              this.Error={
                error:{
                  error:r.responseMessage
                }
              }
            }
            else{
              this.Error=null;
              console.log(r);
              this.isSignupSuccessfull=true;
            }        
          },
          e=>{
            this.isLoading=false;
            console.log('error => ',e)
            this.Error=e;
          }
        )
  
      }
      else{
        console.log('invalid form ',this.signupForm )
        this.isLoading=false;
      }
    }

    

  }

}