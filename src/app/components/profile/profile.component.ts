import { Component } from '@angular/core';
import { ProfileService , Profile} from '../../services/profile.service';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = 'someone@gmail.com';
  ownToken:string|null='';

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
      this.email = user.email; // If you need to use email for display or other purposes
    } else {
      console.error('No currentUser found in localStorage');
      // Handle the case where currentUser is not found in localStorage
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
        phoneNumber: this.phone
      };

      this.profileService.saveProfile(profile,this.ownToken ).subscribe(
        response => {
          console.log('Profile saved successfully', response);
          // Handle successful response
        },
        error => {
          console.error('Error saving profile', error);
          // Handle error response
        }
      );
    } else {
      console.error('No currentUser found in localStorage');
      // Handle the case where currentUser is not found in localStorage
    }
  }

  discardChanges() {
    // Implement discard changes logic if needed
  }
}