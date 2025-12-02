import { Component } from '@angular/core';
import { XIcon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-banner',
  imports: [LucideAngularModule],
  templateUrl: './banner.html',
})
export class Banner {
  readonly XIcon = XIcon;

  hideBanner = false;

  handleCloseBanner() {
    this.hideBanner = true;
  }
}
