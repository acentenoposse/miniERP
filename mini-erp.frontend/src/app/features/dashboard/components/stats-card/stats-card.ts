import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss'
})
export class StatsCard {
  title = input('');
  value = input('');
}
