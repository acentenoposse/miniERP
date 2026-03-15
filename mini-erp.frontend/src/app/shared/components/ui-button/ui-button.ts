import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.scss'
})
export class UiButton {
  label = input('Botón');
  type = input<'button' | 'submit' | 'reset'>('button');
}
