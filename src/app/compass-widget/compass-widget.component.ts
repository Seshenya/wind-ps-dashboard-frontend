
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-compass-widget',
  templateUrl: './compass-widget.component.html',
  styleUrls: ['./compass-widget.component.scss']

})
export class CompassWidgetComponent {
  @ViewChild('circle') circle: ElementRef;
  drawing: boolean;
  styleRotate: SafeStyle;
  name = 'Angular';
  @Input() windPScurrentValue: any;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges() {
    this.styleRotate = this.sanitizer.bypassSecurityTrustStyle(`transform: rotate(${this.windPScurrentValue.WD}deg)`);

  }

}


