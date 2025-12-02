import { Component } from '@angular/core';
import { LucideAngularModule, TrendingUp, Zap, Play, Check } from 'lucide-angular';

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule],
  templateUrl: './hero.html',
})
export class Hero {
  readonly TrendingUp = TrendingUp;
  readonly Zap = Zap;
  readonly Play = Play;
  readonly Check = Check;
}
