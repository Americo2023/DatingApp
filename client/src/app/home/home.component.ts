import { Component } from '@angular/core';
import { RegisterComponent } from "../register/register.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [RegisterComponent],
})
export class HomeComponent  {
  registerMode = false;


  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(e: boolean) {
    this.registerMode = e;
  }
}
