import { Component } from '@angular/core';
import { ProfileService, Profile } from '../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  ownToken: string | null = '';
  profileForm: FormGroup;
  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    public toastService: ToastService
  ) {
    this.ownToken = localStorage.getItem('ownerToken');
    this.profileForm = fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: [''],
    });
  }

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phoneNumber,
        email: user.email,
      });
    } else {
      console.error('No currentUser found in localStorage');
    }
  }

  saveChanges() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const profile: Profile = {
        ownerId: user.ownerID,
        firstName: this.profileForm.get('firstName')?.value,
        lastName: this.profileForm.get('lastName')?.value,
        phoneNumber: this.profileForm.get('phone')?.value,
      };
      const observer = {
        next: (response: any) => {
          console.log('Profile saved successfully', response);
          const updatedUser = { ...user, ...profile };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.toastService.success('Profile saved successfully');
        },
        error: (error: any) => {
          console.error('Error saving profile', error);
          this.toastService.error('An error occurred, try again later');
        },
      };
      this.profileService
        .saveProfile(profile, this.ownToken)
        .subscribe(observer);
    } else {
      console.error('No currentUser found in localStorage');
    }
  }

  discardChanges() {
    this.loadCurrentUser();
  }
}
