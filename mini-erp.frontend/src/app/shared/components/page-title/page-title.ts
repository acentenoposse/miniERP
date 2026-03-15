import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  standalone: true,
  templateUrl: './page-title.html',
  styleUrl: './page-title.scss'
})
export class PageTitle {
  title = input('');
  subtitle = input('');
}
