import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './shell.html',
  styleUrls: ['./shell.css']
})
export class Shell {
  // Aquí puedes luego conectar una señal "isLoading" compartida
  readonly isLoading = signal(false);
}