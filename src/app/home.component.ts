import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  template: `
  <form (ngSubmit)=onSubmit() [formGroup]="profile" class="row">
    
    <div class="d-flex justify-content-center">
        <h5 style="margin-top: 20rem">Please Enter your name: <input formControlName="name">
        <button type="submit">Submit</button></h5>
    </div>
  </form>
  `,
  styleUrls: ['./app.component.css']
})
export class HomeComponent {
  profile!: FormGroup;

  constructor(fb: FormBuilder, private router: Router){
    this.profile = fb.group({
      name: [,[Validators.required]]
    })
  }
    

  onSubmit(){
    if(this.profile.valid){
      localStorage.setItem('user', this.profile.get('name')?.value);
      this.navigateToChatRoom();
    }
  }

  navigateToChatRoom(){
    this.router.navigate(['chat']);
  }
}
