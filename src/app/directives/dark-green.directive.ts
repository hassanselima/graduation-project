import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[DarkGreen]',
})
export class DarkGreenDirective {
  @Input() highlightedColor: string = '#5b9349';
  @Input() defaultColor: string = '#00b562';

  constructor(private elemRef: ElementRef) {
    this.elemRef.nativeElement.style.backgroundColor = `${this.defaultColor}`;
    this.elemRef.nativeElement.style.border = `none`;
  }
  @HostListener('mouseover') onMouseover() {
    this.elemRef.nativeElement.style.backgroundColor = `${this.highlightedColor}`;
  }
  @HostListener('mouseout') onMouseout() {
    this.elemRef.nativeElement.style.backgroundColor = `${this.defaultColor}`;
  }
}
