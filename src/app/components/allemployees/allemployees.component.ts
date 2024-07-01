import { Component } from '@angular/core';

@Component({
  selector: 'app-allemployees',
  templateUrl: './allemployees.component.html',
  styleUrl: './allemployees.component.css'
})
export class AllemployeesComponent {
  employees = [
    {
      name: 'أحمد حسن',
      phone: '7760542844',
      email: 'someone@gmail.com',
      image:  '../../../assets/4628fd142082333ed400b2907d918bea.jpeg' // replace with actual image path or URL
    },
    {
      name: 'محمد علي',
      phone: '7760542845',
      email: 'someoneelse@gmail.com',
      image: '../../../assets/4628fd142082333ed400b2907d918bea.jpeg' // replace with actual image path or URL
    },
    // Add more employee objects as needed
    {
      name: 'محمد علي',
      phone: '7760542845',
      email: 'someoneelse@gmail.com',
      image:  '../../../assets/4628fd142082333ed400b2907d918bea.jpeg' // replace with actual image path or URL
    },
    {
      name: 'محمد علي',
      phone: '7760542845',
      email: 'someoneelse@gmail.com',
      image:  '../../../assets/4628fd142082333ed400b2907d918bea.jpeg' // replace with actual image path or URL
    },
  ];
}
