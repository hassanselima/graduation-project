import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-img-modal',
  templateUrl: './img-modal.component.html',
  styleUrl: './img-modal.component.css',
})
export class ImgModalComponent {
  @Input() imageSrc: string = '';
  isVisible: boolean = false;
  guardId: string = '';

  constructor(private router: Router, private sharSer: SharedDataService) {}
  open(imageSrc: string, guardId: string) {
    this.imageSrc = imageSrc;
    this.isVisible = true;
    this.guardId = guardId;
  }

  close() {
    this.isVisible = false;
  }
  edit() {
    this.sharSer.setGuardId(this.guardId);
    this.router.navigate(['/dashboard/employeesP2'], {
      queryParams: { action: 'edit' },
    });
  }
}
