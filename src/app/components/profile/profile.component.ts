import { Component } from '@angular/core';
import { ProfileService, Profile } from '../../services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  ownToken: string | null = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  profileForm: FormGroup;
  constructor(private profileService: ProfileService, private fb: FormBuilder) {
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
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
          console.log('Profile saved successfully', response);
          const updatedUser = { ...user, ...profile };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        },
        error: (error: any) => {
          this.showSuccessMessage = false;
          this.showErrorMessage = true;
          this.errorMessage = 'Error saving profile: Try again later';
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
          console.error('Error saving profile', error);
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
