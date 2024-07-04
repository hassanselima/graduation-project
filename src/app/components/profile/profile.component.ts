import { Component } from '@angular/core';
import { ProfileService, Profile } from '../../services/profile.service';
import { Token } from '@angular/compiler';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = 'someone@gmail.com';
  ownToken: string | null = '';
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  errorMessage: string = '';

  constructor(private profileService: ProfileService) {
    this.ownToken = localStorage.getItem('ownerToken');
  }

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.phone = user.phoneNumber;
      this.email = user.email;
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
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phone,
      };
      this.profileService.saveProfile(profile, this.ownToken).subscribe(
        (response) => {
          this.showSuccessMessage = true;
          this.showErrorMessage = false;
          console.log('Profile saved successfully', response);
        },
        (error) => {
          this.showSuccessMessage = false;
          this.showErrorMessage = true;
          this.errorMessage = 'Error saving profile: ' + error.message;
          console.error('Error saving profile', error);
        }
      );
    } else {
      console.error('No currentUser found in localStorage');
    }
  }

  discardChanges() {
    this.loadCurrentUser();
  }
}
